import { PDFParse } from "pdf-parse";
import { ocrViaClaude } from "./ocrViaClaude.js";

function isTextEmpty(text: string): boolean {
    const cleaned = text
        .replace(/--\s*\d+\s*of\s*\d+\s*--/g, "")
        .replace(/\s+/g, " ")
        .trim();

    return cleaned.length < 30;
}

export async function extractPdfText(buffer: Buffer) {
    const pdfParse = new Uint8Array(buffer);

    const data = new PDFParse({
        data: pdfParse,
    })

    const result = await data.getText();

    if (isTextEmpty(result.text)) {
        console.log("PDF has no embedded text, falling back to Claude Vision OCR");
        return ocrViaClaude(buffer);
    }

    return result.text;
}