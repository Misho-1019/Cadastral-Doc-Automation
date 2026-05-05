import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { DraftPayload } from "../types/draftPayload";
import path from "path";
import { buildTemplateData } from "./buildTemplateData";

export function generateDocx(payload: DraftPayload, templatePath: string, outputPath: string) {
    const content = fs.readFileSync(templatePath, "binary")

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, delimiters: { start: "{{", end: "}}" } })

    try {
        doc.render(buildTemplateData(payload));
    } catch (error) {
        console.error('Template rendering error:', error);
        throw error;
    }

    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' })

    fs.writeFileSync(outputPath, buffer)
}