import { PDFParse } from "pdf-parse";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    const pdfData = new Uint8Array(buffer);

    const data = new PDFParse({
        data: pdfData
    });

    const result = await data.getText();

    return result.text;
}