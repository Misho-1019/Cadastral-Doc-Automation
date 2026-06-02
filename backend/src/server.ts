import './config/env.js';

import express from "express";
import cors from "cors";

import descriptionsRouter from "./routes/descriptions.routes.js";

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
].filter((origin): origin is string => origin !== undefined);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

app.use("/api/descriptions", descriptionsRouter);

const PORT = process.env.PORT || 3030;

app.get("/", (_req, res) => {
    res.json({
        message: "Cadastral Description API is running",
    });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));