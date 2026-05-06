import { Request, Response } from "express";
import path from "path";
import { extractPdfText } from "../../extract/extractPdfText";
import { normalizePdfText } from "../../normalize/normalizePdfText";
import { parseCadastreFields } from "../../parse/parseCadastreFields";
import { buildFormDraftData } from "../builders/buildFormDraftData";
import { generateDocx } from "../../build/generateDocx";
import { validateDraftPayload } from "../../validate/validateDocumentInput";

export const parsePdfController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            })
        }

        const filePath = req.file.path;

        const rawText = await extractPdfText(filePath);
        const normalizedText = normalizePdfText(rawText);
        const parsedData = parseCadastreFields(normalizedText);

        return res.json({
            success: true,
            message: "PDF parsed successfully",
            data: buildFormDraftData(parsedData),
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to process PDF",
        });
    }
}

export const generateDocxController = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const validation = validateDraftPayload(formData);

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid draft payload",
                errors: validation.errors,
            });
        }

        const templatePath = path.join(
            process.cwd(),
            "templates",
            "notarial-act-template-v1.docx"
        )

        const outputPath = path.join(
            process.cwd(),
            "output",
            `notarial-act-${Date.now()}.docx`
        )

        generateDocx(formData, templatePath, outputPath);

        return res.json({
            success: true,
            message: "DOCX generated successfully",
            file: {
                path: outputPath,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate DOCX",
        });
    }
}