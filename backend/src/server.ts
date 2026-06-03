import './config/env.js';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import descriptionsRouter from "./routes/descriptions.routes.js";

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
].filter((origin): origin is string => origin !== undefined);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

const generateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api/descriptions/generate", generateLimiter);

app.use("/api/descriptions", descriptionsRouter);

const PORT = process.env.PORT || 3030;

app.get("/", (_req, res) => {
    res.json({
        message: "Cadastral Description API is running",
    });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
