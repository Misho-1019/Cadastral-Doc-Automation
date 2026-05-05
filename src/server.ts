import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: "Cadastral document automation API is running",
    });
})

app.listen(PORT, () => { console.log(`Server is running on port http://localhost:${PORT}`); })