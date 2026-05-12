import { Request, Response, NextFunction } from "express";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Server error:", error);

    if (error instanceof Error) {
        return res.status(500).json({
            error: error.message || "Internal server error",
        });
    }

    return res.status(500).json({
        error: "Internal server error",
    });
}