import { Request, Response } from "express";
import { extractPdfText } from "../../extract/extractPdfText";
import { normalizePdfText } from "../../normalize/normalizePdfText";
import { parseCadastreFields } from "../../parse/parseCadastreFields";
import { buildFormDraftData } from "../builders/buildFormDraftData";

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