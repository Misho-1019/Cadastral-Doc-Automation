import express from "express";
import cors from "cors";

import uploadRoutes from "./modules/uploads/uploads.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        service: "cadastral-document-automation-backend"
    });
});

app.use('/api/cases', uploadRoutes)