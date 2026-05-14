import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText.js";
import { detectDocumentType, type DocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { formatCardinal } from "../formatting/numberWords.js";
import { formatIdentifier } from "../formatting/formatIdentifier.js";
import { formatArea } from "../formatting/formatArea.js";
import { formatPercentage } from "../formatting/formatPercentage.js";
import { formatFreeTextNumbers } from "../formatting/formatFreeTextNumbers.js";
import { formatMoney } from "../formatting/formatMoney.js";
import { buildPropertyDescription } from "../documents/buildPropertyDescription.js";
import path from "path";
import { generateDocx } from "../documents/generateDocx.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        const rawText = await extractTextFromPdf(req.file.buffer);

        const text = normalizePdfText(rawText);

        const documentType = detectDocumentType(text);

        const extractedData = parseBasicCadastralData(text, documentType)

        const validation = validateCadastralData(extractedData);

        const propertyDescription = buildPropertyDescription(extractedData);

        const generatedDocxPath = path.resolve("generated", `notarial-act-${Date.now()}.docx`);

        generateDocx({
            templatePath: path.resolve("templates", "notarial-act-template.docx"),
            outputPath: generatedDocxPath,
            data: {
                propertyDescription,
            }
        })

        res.json({
            message: "File processed successfully",
            fileName: req.file.originalname,
            documentType,
            extractedData,
            validation,
            propertyDescription,
            generatedDocxPath,
            preview: text.substring(0, 3000) // first 1000 chars only
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to process PDF"
        });
    }
})

export default router;