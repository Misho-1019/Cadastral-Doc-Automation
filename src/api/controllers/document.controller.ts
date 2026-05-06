import { Request, Response } from "express";
import { extractPdfText } from "../../extract/extractPdfText";

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
    
        return res.json({
            success: true,
            message: "PDF text extracted",
            preview: rawText.slice(0, 1000), // just preview, not full text
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to process PDF",
        });
    }
}