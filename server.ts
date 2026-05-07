import express, { Request, Response } from "express";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import multer from "multer";
import { validateTemplateData } from "./utils/validateTemplateData.js";
import { extractPdfText } from "./utils/extractPdfText.js";
import { extractOwnerName, extractPropertyAddress, extractPropertyArea, extractPropertyIdentifier } from "./utils/parseCadastralPdf.js";

const upload = multer({
    dest: 'uploads/'
})

const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Doc generator is running');
});

app.post('/generate', (req: Request, res: Response) => {
    try {
        if (!validateTemplateData(req.body)) {
            return res.status(400).json({ error: 'Invalid input data' });
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

        doc.render(req.body)

        const buf = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        })

        fs.writeFileSync('./output/result.docx', buf);

        res.send('Document generated!')
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

        const propertyIdentifier = extractPropertyIdentifier(text);
        const propertyAddress = extractPropertyAddress(text);
        const propertyArea = extractPropertyArea(text);
        const ownerName = extractOwnerName(text);

        res.json({
            message: 'File uploaded and parsed',
            propertyIdentifier,
            propertyAddress,
            propertyArea,
            ownerName
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' })
    }
})

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })