import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { DraftPayload } from "../types/draftPayload";

export function generateDocx(payload: DraftPayload) {
    const content = fs.readFileSync("./templates/notarial-act-template-v1.docx", "binary")

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, delimiters: { start: "{{", end: "}}" } })

    try {
        doc.render({
            ...payload.manual_data,
            ...payload.calculated_data,
            ...payload.derived_data,
        });
    } catch (error) {
        console.error('Template rendering error:', error);
        throw error;
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' })

    fs.writeFileSync("./output/result.docx", buffer)
}