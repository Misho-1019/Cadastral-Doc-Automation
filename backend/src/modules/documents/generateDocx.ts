import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

type GenerateDocxInput = {
    templatePath: string;
    outputPath: string;
    data: Record<string, unknown>;
};

export function generateDocx(input: GenerateDocxInput): string {
    const content = fs.readFileSync(input.templatePath, "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: {
            start: "{{",
            end: "}}"
        }
    });

    doc.render(input.data);

    const buffer = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE"
    });

    const outputDir = path.dirname(input.outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(input.outputPath, buffer);

    return input.outputPath;
}