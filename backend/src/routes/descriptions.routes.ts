import { Router } from "express";
import multer from "multer";
import { extractPdfText } from "../services/extractPdfText.js";
import { detectCadastralDocumentType } from "../services/detectCadastralDocumentType.js";
import { claude } from "../services/claudeClient.js";

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

        const claudeResponse = await claude.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 100,
            messages: [
                {
                    role: 'user',
                    content: 'Reply only with: Claude connection works'
                }
            ]
        })
    
        return res.json({
            message: "PDF processed successfully",
            documentType,
            claudeResponse: claudeResponse.content,
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Failed to process PDF",
        });
    }
});

export default router;