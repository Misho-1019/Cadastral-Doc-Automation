import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.get("/", (_req, res) => {
    res.json({
        message: "Cadastral Description API is running",
    });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));