import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText.js";
import { detectDocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { buildPropertyDescription } from "../documents/buildPropertyDescription.js";
import { createCase, getCaseById, updateCaseManualData } from "../cases/cases.store.js";
import path from "path";
import { generateDocx } from "../documents/generateDocx.js";
import { formatMoney } from "../formatting/formatMoney.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        const rawText = await extractTextFromPdf(req.file.buffer);
        const text = normalizePdfText(rawText);

        const documentType = detectDocumentType(text);
        const extractedData = parseBasicCadastralData(text, documentType);
        const validation = validateCadastralData(extractedData);
        const propertyDescription = buildPropertyDescription(extractedData);

        const manualData = req.body.manualData
            ? JSON.parse(req.body.manualData)
            : null;

        const caseRecord = await createCase({
            fileName: req.file.originalname,
            documentType,
            extractedData,
            validation,
            propertyDescription,
            manualData
        });

        return res.json({
            message: "Case created successfully",
            caseId: caseRecord.id,
            fileName: caseRecord.fileName,
            documentType: caseRecord.documentType,
            extractedData: caseRecord.extractionResult?.extractedJson,
            validation: caseRecord.extractionResult?.validationJson,
            propertyDescription: caseRecord.propertyDescription
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process PDF"
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const caseRecord = await getCaseById(id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    return res.json(caseRecord);
})

router.post('/:id/generate-docx', async (req, res) => {
    const { id } = req.params;

    const caseRecord = await getCaseById(id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    const manualData = caseRecord.manualCaseData?.dataJson as any;

    const salePriceFormatted = manualData?.transaction?.salePrice
        ? formatMoney(String(manualData.transaction.salePrice))
        : "";

    const depositAmountFormatted = manualData?.transaction?.depositAmount
        ? formatMoney(String(manualData.transaction.depositAmount))
        : "";

    const remainingAmountFormatted = manualData?.transaction?.remainingAmount
        ? formatMoney(String(manualData.transaction.remainingAmount))
        : "";

    const taxEvaluationFormatted = manualData?.taxEvaluation?.amount
        ? formatMoney(String(manualData.taxEvaluation.amount))
        : "";

    const outputPath = path.resolve(
        "generated",
        `notarial-act-${id}.docx`
    );

    generateDocx({
        templatePath: path.resolve("templates", "notarial-act-template.docx"),
        outputPath,
        data: {
            propertyDescription: caseRecord.propertyDescription,

            sellerName: manualData?.seller?.fullName || "",
            buyerName: manualData?.buyer?.fullName || "",

            salePriceFormatted,
            depositAmountFormatted,
            remainingAmountFormatted,
            taxEvaluationFormatted,

            contractDate: manualData?.transaction?.contractDate || "",
            preliminaryContractDate: manualData?.transaction?.preliminaryContractDate || "",

            taxEvaluationNumber: manualData?.taxEvaluation?.number || "",
            taxEvaluationDate: manualData?.taxEvaluation?.date || "",

            notaryName: manualData?.notary?.name || "",

            bankBic: manualData?.bankDetails?.bic || "",
            bankIban: manualData?.bankDetails?.iban || ""
        }
    });

    return res.download(outputPath);
});

router.patch('/:id/manual-data', async (req, res) => {
    const { id } = req.params;

    const updatedCase = await updateCaseManualData(id, req.body);

    if (!updatedCase) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    return res.json({
        message: "Manual data updated successfully",
        case: updatedCase
    });
});

export default router;