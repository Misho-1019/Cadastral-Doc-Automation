import { Router } from "express";
import multer from "multer";
import { extractPdfText } from "../services/extractPdfText.js";
import { detectCadastralDocumentType } from "../services/detectCadastralDocumentType.js";
import { extractCadastralData } from "../services/extractCadastralData.js";
import { validateExtractedData } from "../services/validateExtractedData.js";
import { generateAiDescription } from "../services/generateAiDescription.js";
import { formatDuration } from "../utils/formatDuration.js";
import prisma from "../lib/prisma.js";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post("/generate", upload.single("pdf"), async (req, res) => {
    try {
        const requestStart = Date.now();

        if (!req.file) {
            return res.status(400).json({
                message: "PDF file is required",
            });
        }

        const extractedText = await extractPdfText(req.file.buffer);
        const documentType = detectCadastralDocumentType(extractedText);

        const extractionStart = Date.now();

        const extractedData = await extractCadastralData(extractedText);

        const extractionTimeMs = Date.now() - extractionStart;

        const validationErrors = validateExtractedData(extractedData, documentType);

        const descriptionStart = Date.now();

        const description = await generateAiDescription(documentType, extractedData);

        const descriptionTimeMs = Date.now() - descriptionStart;

        const totalTimeMs = Date.now() - requestStart;

        const result = {
            documentType,
            extractedData,
            validationErrors,
            description,
            performance: {
                extractionTimeMs,
                extractionTime: formatDuration(extractionTimeMs),
                descriptionTimeMs,
                descriptionTime: formatDuration(descriptionTimeMs),
                totalTimeMs,
                totalTime: formatDuration(totalTimeMs),
            }
        };

        await prisma.descriptionHistory.create({
            data: {
                documentType,
                identifier: extractedData.identifier || null,
                description,
                extractedData,
                validationErrors,
                performance: result.performance,
                fileName: req.file.originalname || null,
            }
        })

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to process PDF",
        });
    }
});

router.get("/history", async (req, res) => {
    try {
        const records = await prisma.descriptionHistory.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                documentType: true,
                identifier: true,
                description: true,
                createdAt: true,
            }
        });

        return res.json(records);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve history' });
    }
})

router.get("/history/:id", async (req, res) => {
    try {
        const record = await prisma.descriptionHistory.findUnique({
            where: { id: req.params.id },
        })

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        return res.json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch record" });
    }
})

router.delete("/history/:id", async (req, res) => {
    try {
        await prisma.descriptionHistory.delete({
            where: { id: req.params.id },
        });

        return res.json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete record" });
    }
})

export default router;