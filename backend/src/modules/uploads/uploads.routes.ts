import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded"
        });
    }

    res.json({
        message: "File received successfully",
        fileName: req.file.originalname,
        size: req.file.size
    });
})

export default router;