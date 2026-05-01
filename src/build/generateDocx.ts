import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { DraftPayload } from "../types/draftPayload";

export function generateDocx(payload: DraftPayload) {
    const content = fs.readFileSync("./templates/test-template.docx", "binary")

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, delimiters: { start: "{{", end: "}}" } })

    doc.setData({
        ...payload.manual_data,
        ...payload.calculated_data,
        ...payload.derived_data,
    })

    try {
        doc.render();
    } catch (error) {
        console.error('Template rendering error:', error);
        throw error;
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' })

    fs.writeFileSync("./output/result.docx", buffer)
}