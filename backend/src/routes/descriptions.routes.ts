import { Router } from "express";
import multer from "multer";
import { extractPdfText } from "../services/extractPdfText.js";
import { detectCadastralDocumentType } from "../services/detectCadastralDocumentType.js";
import { extractCadastralData } from "../services/extractCadastralData.js";
import { validateExtractedData } from "../services/validateExtractedData.js";
import { generateDescription } from "../services/generateDescription.js";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post("/generate", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "PDF file is required",
            });
        }

        const extractedText = await extractPdfText(req.file.buffer);
        const documentType = detectCadastralDocumentType(extractedText);

        const extractedData = await extractCadastralData(extractedText);
        const validationErrors = validateExtractedData(extractedData);
        const description = generateDescription(extractedData);
    
        return res.json({
            message: "PDF processed successfully",
            documentType,
            extractedData,
            validationErrors,
            description,
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Failed to process PDF",
        });
    }
});

export default router;