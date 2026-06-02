import type { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = header.slice(7);

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = data.user.id;

    next();
}