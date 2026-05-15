import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText.js";
import { detectDocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { buildPropertyDescription } from "../documents/buildPropertyDescription.js";
import { createCase, createGeneratedDocument, getCaseById, updateCaseManualData } from "../cases/cases.store.js";
import path from "path";
import { generateDocx } from "../documents/generateDocx.js";
import { buildDocxTemplateData } from "../documents/buildDocxTemplateData.js";

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

    const templateData = buildDocxTemplateData(caseRecord);

    const outputPath = path.resolve(
        "generated",
        `notarial-act-${id}.docx`
    );

    generateDocx({
        templatePath: path.resolve("templates", "notarial-act-template.docx"),
        outputPath,
        data: templateData,
    });

    await createGeneratedDocument(id, outputPath);

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