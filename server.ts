import express, { Request, Response } from "express";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { sampleData } from "./data/sampleData.js";

const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Doc generator is running');
});

app.get('/generate', (req: Request, res: Response) => {
    try {
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

        doc.render(sampleData)

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

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })