import { Router } from "express";
import multer from "multer";
import { extractPdfText } from "../services/extractPdfText.js";

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
    
        return res.json({
            message: "PDF uploaded successfully",
            extractedText,
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Failed to process PDF",
        });
    }
});

export default router;