import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText.js";
import { detectDocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { buildPropertyDescription } from "../documents/buildPropertyDescription.js";
import { createCase } from "../cases/cases.store.js";
import { validateManualCaseData } from "../cases/validateManualCaseData.js";

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

        const validationResult = manualData
            ? validateManualCaseData(manualData)
            : null;

        if (validationResult && !validationResult.isValid) {
            return res.status(400).json({
                error: "Invalid manual data",
                validationErrors: validationResult.errors
            });
        }

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

export default router;