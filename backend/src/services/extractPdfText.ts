import { PDFParse } from "pdf-parse";

export async function extractPdfText(buffer: Buffer) {
    const pdfParse = new Uint8Array(buffer);

    const data = new PDFParse({
        data: pdfParse,
    })

    const result = await data.getText();

    return result.text;
}