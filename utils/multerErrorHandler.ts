import { Request, Response, NextFunction } from "express";
import multer from "multer";

export function multerErrorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                error: "Uploaded PDF is too large. Maximum file size is 10MB.",
            });
        }

        return res.status(400).json({
            error: error.message,
        });
    }

    next(error);
}