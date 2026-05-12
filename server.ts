import "dotenv/config";
import express, { Request, Response } from "express";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import multer from "multer";
import cors from "cors";
import { randomUUID } from "crypto";
import rateLimit from "express-rate-limit";
import { validateTemplateData } from "./utils/validateTemplateData.js";
import { extractPdfText } from "./utils/extractPdfText.js";
import { parseCadastralPdf } from "./utils/parseCadastralPdf.js";
import { GenerateRequestBody } from "./types/generateRequest.js";
import { TemplateData } from "./types/templateData.js";
import { mapPdfToTemplateData } from "./utils/mapPdfToTemplateData.js";
import { euroAmountToWordsBG, formatEuroAmount } from "./utils/formatMoney.js";
import { dateToWordsBG } from "./utils/dateToWordsBG.js";
import { formatAddressBG } from "./utils/formatAddressBG.js";
import { toTitleCaseBG } from "./utils/toTitleCaseBG.js";
import { error } from "console";
import { multerErrorHandler } from "./utils/multerErrorHandler.js";

const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
})

const app = express();
const PORT = process.env.PORT || 3030;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const generateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many requests, please try again later.'
    }
})

function deleteUploadedFile(filePath?: string) {
    if (!filePath) return;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting uploaded file:", err);
        }
    })
}

app.use(cors({
    origin: [FRONTEND_URL],
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Doc generator is running');
});

app.post('/generate', generateLimiter, upload.single('file'), async (req: Request<{}, {}, GenerateRequestBody>, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF uploaded' });
        }

        const text = await extractPdfText(req.file.path);
        const parsedData = parseCadastralPdf(text);

        const pdfTemplateData = mapPdfToTemplateData(parsedData)

        let formData: TemplateData;

        try {
            formData = JSON.parse(req.body.data) as TemplateData;
        } catch {
            deleteUploadedFile(req.file.path)

            return res.status(400).json({
                error: 'Invalid JSON data'
            });
        }

        const validation = validateTemplateData(formData);

        if (!validation.isValid) {
            deleteUploadedFile(req.file.path)

            return res.status(400).json({ error: 'Validation failed', fields: validation.errors });
        }

        if (formData.sale_price) {
            formData.sale_price = formatEuroAmount(formData.sale_price);
            formData.sale_price_words = euroAmountToWordsBG(formData.sale_price);
        }

        if (formData.deposit_amount) {
            formData.deposit_amount = formatEuroAmount(formData.deposit_amount);
            formData.deposit_amount_words = euroAmountToWordsBG(formData.deposit_amount);
        }

        if (formData.remaining_amount) {
            formData.remaining_amount = formatEuroAmount(formData.remaining_amount);
            formData.remaining_amount_words = euroAmountToWordsBG(formData.remaining_amount);
        }

        if (formData.tax_evaluation) {
            formData.tax_evaluation_words = euroAmountToWordsBG(formData.tax_evaluation);
            formData.tax_evaluation = formatEuroAmount(formData.tax_evaluation).replace(/,\s*/, ", ");
        }

        if (formData.contract_date) {
            formData.contract_date_words = dateToWordsBG(formData.contract_date);
        }

        const finalData = {
            ...pdfTemplateData,
            ...formData,
        }

        if (finalData.property_address_full) {
            finalData.property_address_full = formatAddressBG(finalData.property_address_full)
        }

        finalData.seller_name_signature = toTitleCaseBG(finalData.seller_name).replace(/-/g, "–");
        finalData.buyer_name_signature = toTitleCaseBG(finalData.buyer_name).replace(/-/g, "–");

        const content = fs.readFileSync('./templates/template.docx', 'binary');

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: {
                start: '{{',
                end: '}}'
            }
        })

        doc.render(finalData)

        const buf = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        })

        const outputDir = './output';
        const fileName = `contract-${randomUUID()}.docx`;
        const outputPath = `${outputDir}/${fileName}`;

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        fs.writeFileSync(outputPath, buf);

        res.download(outputPath, fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
            }

            deleteUploadedFile(req.file?.path)

            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting output file:", unlinkErr);
                }
            });
        });
    } catch (error) {
        console.error(error);
        deleteUploadedFile(req.file?.path)
        res.status(500).json({ error: 'Error generating document' });
    }
})

app.post('/upload-pdf', generateLimiter, upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const text = await extractPdfText(req.file.path);

        const parsedData = parseCadastralPdf(text)

        deleteUploadedFile(req.file.path)

        res.json({
            message: 'File uploaded and parsed',
            data: parsedData
        });
    } catch (error) {
        console.error(error);
        deleteUploadedFile(req.file?.path)
        res.status(500).json({ error: 'Upload failed' })
    }
})

app.use(multerErrorHandler)

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })