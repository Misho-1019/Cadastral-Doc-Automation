import express, { Request, Response } from "express";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import multer from "multer";
import cors from "cors";
import { validateTemplateData } from "./utils/validateTemplateData.js";
import { extractPdfText } from "./utils/extractPdfText.js";
import { parseCadastralPdf } from "./utils/parseCadastralPdf.js";
import { GenerateRequestBody } from "./types/generateRequest.js";
import { TemplateData } from "./types/templateData.js";
import { mapPdfToTemplateData } from "./utils/mapPdfToTemplateData.js";
import { numberToWordsBG } from "./utils/numberToWords.js";
import { euroAmountToWordsBG, formatEuroAmount } from "./utils/formatMoney.js";
import { dateToWordsBG } from "./utils/dateToWordsBG.js";
import { formatAddressBG } from "./utils/formatAddressBG.js";
import { toTitleCaseBG } from "./utils/toTitleCaseBG.js";

const upload = multer({
    dest: 'uploads/'
})

const app = express();
const PORT = 3030;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Doc generator is running');
});

app.post('/generate', upload.single('file'), async (req: Request<{}, {}, GenerateRequestBody>, res: Response) => {
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
            return res.status(400).json({
                error: 'Invalid JSON data'
            });
        }

        if (!validateTemplateData(formData)) {
            return res.status(400).json({ error: 'Invalid input data' });
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
            formData.tax_evaluation = formatEuroAmount(formData.tax_evaluation);
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

        finalData.seller_name_signature = toTitleCaseBG(finalData.seller_name);
        finalData.buyer_name_signature = toTitleCaseBG(finalData.buyer_name);

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
        const outputPath = `${outputDir}/result.docx`;

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        fs.writeFileSync(outputPath, buf);

        res.download(outputPath, 'generated-contract.docx', (err) => {
            if (err) {
                console.error('Download error:', err);
            }

            if (req.file) {
                fs.unlink(req.file.path, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting uploaded file:', unlinkErr);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating document' });
    }
})

app.post('/upload-pdf', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const text = await extractPdfText(req.file.path);

        const parsedData = parseCadastralPdf(text)

        res.json({
            message: 'File uploaded and parsed',
            data: parsedData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' })
    }
})

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })