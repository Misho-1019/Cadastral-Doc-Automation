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
import { formatEuroAmount } from "./utils/formatMoney.js";

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

        const formData = JSON.parse(req.body.data) as TemplateData;

        // if (!validateTemplateData(formData)) {
        //     return res.status(400).json({ error: 'Invalid input data' });
        // }

        if (formData.sale_price) {
            const priceNumber = Number(String(formData.sale_price).replace(/\s/g, '').replace(',', '.'));

            formData.sale_price = formatEuroAmount(formData.sale_price);
            formData.sale_price_words = numberToWordsBG(priceNumber);
        }

        if (formData.tax_evaluation) {
            formData.tax_evaluation = formatEuroAmount(formData.tax_evaluation);
        }

        const finalData = {
            ...pdfTemplateData,
            ...formData,
        }

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

        const outputPath = './output/result.docx';

        fs.writeFileSync(outputPath, buf);

        res.download(outputPath, 'generated-contract.docx')
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating document');
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