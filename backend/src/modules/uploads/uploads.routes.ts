import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText";
import { detectDocumentType } from "../extraction/detectDocumentType";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        const text = await extractTextFromPdf(req.file.buffer);

        const documentType = detectDocumentType(text);

        res.json({
            message: "File processed successfully",
            fileName: req.file.originalname,
            documentType: documentType,
            preview: text.substring(0, 1000) // first 1000 chars only
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to process PDF"
        });
    }
})

export default router;