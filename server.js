import express from "express";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Doc generator is running');
});

app.get('/generate', (req, res) => {
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

        doc.render({
            seller_name: "ИВАН ИВАНОВ",
            buyer_name: "ПЕТЪР ПЕТРОВ",
            contract_date: "01.01.2026",
            contract_date_words: "първи януари две хиляди двадесет и шеста година",
            sale_price: "100 000",
            sale_price_words: "сто хиляди"
        })

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