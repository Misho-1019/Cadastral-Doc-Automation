import { Router } from "express";
import multer from "multer";
import { extractPdfText } from "../services/extractPdfText.js";
import { detectCadastralDocumentType } from "../services/detectCadastralDocumentType.js";
import { extractCadastralData } from "../services/extractCadastralData.js";
import { validateExtractedData } from "../services/validateExtractedData.js";
import { generateAiDescription } from "../services/generateAiDescription.js";
import { generateNotarialActDocx } from "../services/fillNotarialAct.js";
import { formatDuration } from "../utils/formatDuration.js";
import { dateToBgWords, numberToBgWords, percentageToBgWords, currencyToBgWords } from "../utils/numberToWords.js";
import type { NotarialActFormData, NotarialActTemplateData } from "../types/notarialAct.types.js";
import { streamChat } from "../services/chatService.js";
import prisma from "../lib/prisma.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "Messages array is required" });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        for await (const chunk of streamChat(messages)) {
            res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
        }
        res.write("data: [DONE]\n\n");
        res.end();
    } catch (error) {
        console.error("Chat error:", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Chat service error" });
        }
        res.write(`data: ${JSON.stringify({ error: "Something went wrong" })}\n\n`);
        res.end();
    }
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post("/generate", auth, upload.single("pdf"), async (req, res) => {
    try {
        const requestStart = Date.now();

        if (!req.file) {
            return res.status(400).json({
                message: "PDF file is required",
            });
        }

        const extractedText = await extractPdfText(req.file.buffer);
        const documentType = detectCadastralDocumentType(extractedText);

        if (documentType === "UNKNOWN") {
            return res.status(400).json({
                message: "Unsupported or unrecognised cadastral document type",
            });
        }

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
                userId: req.userId || null,
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

router.post("/generate-notarial-act", auth, async (req, res) => {
    try {
        const { formData, aiDescription, documentNumber, issueDate, identifier, extractedDataValues } = req.body;

        if (!formData || !aiDescription) {
            return res.status(400).json({
                message: "Form data and AI description are required",
            });
        }

        const f: NotarialActFormData = formData;

        const actDateWords = dateToBgWords(f.actDate);
        const priceWords = numberToBgWords(f.price) + " " + f.priceCurrency;
        const depositAmountWords = numberToBgWords(f.depositAmount) + " " + f.priceCurrency;
        const depositPercentageWords = percentageToBgWords(f.depositPercentage);
        const remainingAmount = f.price - f.depositAmount;
        const remainingAmountWords = numberToBgWords(remainingAmount) + " " + f.priceCurrency;
        const taxAssessmentValueWords = currencyToBgWords(f.taxAssessmentValue, f.priceCurrency);

        const templateData: NotarialActTemplateData = {
            ...f,
            aiDescription,
            documentNumber: documentNumber || "",
            issueDate: issueDate || "",
            extractedDataValues: extractedDataValues || [],
            actDateWords,
            priceWords,
            depositAmountWords,
            depositPercentageWords,
            remainingAmount,
            remainingAmountWords,
            taxAssessmentValueWords,
        };

        const docxBuffer = await generateNotarialActDocx(templateData);

        // Save to history (fire-and-forget, don't block response)
        prisma.notarialActHistory.create({
            data: {
                identifier: identifier || documentNumber || null,
                sellerName: f.sellerName,
                buyerName: f.buyerName,
                templateData: templateData as any,
                fileName: `Notarial-Act-${f.buyerName}.docx`,
                userId: req.userId || null,
            }
        }).catch((err: unknown) => console.error("Failed to save notarial act history:", err));

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=notarial-act.docx"
        );
        res.send(docxBuffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to generate notarial act",
        });
    }
});

router.get("/history", auth, async (req, res) => {
    try {
        const records = await prisma.descriptionHistory.findMany({
            where: { userId: req.userId || null },
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

router.get("/history/:id", auth, async (req, res) => {
    try {
        const record = await prisma.descriptionHistory.findFirst({
            where: { id: req.params.id as string, userId: req.userId || null },
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

router.delete("/history/:id", auth, async (req, res) => {
    try {
        const record = await prisma.descriptionHistory.findFirst({
            where: { id: req.params.id as string, userId: req.userId || null },
        })

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        await prisma.descriptionHistory.delete({
            where: { id: req.params.id as string },
        });

        return res.json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete record" });
    }
})

router.get("/notarial-act-history", auth, async (req, res) => {
    try {
        const records = await prisma.notarialActHistory.findMany({
            where: { userId: req.userId || null },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                identifier: true,
                sellerName: true,
                buyerName: true,
                fileName: true,
                createdAt: true,
            }
        });

        return res.json(records);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve notarial act history' });
    }
})

router.get("/notarial-act-history/:id/download", auth, async (req, res) => {
    try {
        const record = await prisma.notarialActHistory.findFirst({
            where: { id: req.params.id as string, userId: req.userId || null },
        })

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        const templateData = record.templateData as unknown as NotarialActTemplateData;
        const docxBuffer = await generateNotarialActDocx(templateData);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=notarial-act.docx"
        );
        res.send(docxBuffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to download notarial act" });
    }
})

router.delete("/notarial-act-history/:id", auth, async (req, res) => {
    try {
        const record = await prisma.notarialActHistory.findFirst({
            where: { id: req.params.id as string, userId: req.userId || null },
        })

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        await prisma.notarialActHistory.delete({
            where: { id: req.params.id as string },
        });

        return res.json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete record" });
    }
})

export default router;