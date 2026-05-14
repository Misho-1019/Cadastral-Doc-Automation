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
            
        const caseRecord = createCase({
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
            extractedData: caseRecord.extractedData,
            validation: caseRecord.validation,
            propertyDescription: caseRecord.propertyDescription
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process PDF"
        });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const caseRecord = getCaseById(id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    return res.json(caseRecord);
})

router.post('/:id/generate-docx', (req, res) => {
    const { id } = req.params;

    const caseRecord = getCaseById(id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    const outputPath = path.resolve(
        "generated",
        `notarial-act-${id}.docx`
    );

    generateDocx({
        templatePath: path.resolve('templates', 'notarial-act-template.docx'),
        outputPath,
        data: {
            propertyDescription: caseRecord.propertyDescription,
        }
    })

    return res.download(outputPath);
});

router.patch('/:id/manual-data', (req, res) => {
    const { id } = req.params;

    const updatedCase = updateCaseManualData(id, req.body);

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