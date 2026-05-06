import { Request, Response } from "express";

export const parsePdfController = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        })
    }

    return res.json({
        success: true,
        message: "File uploaded successfully",
        file: {
            filename: req.file.filename,
            path: req.file.path,
        }
    })
}