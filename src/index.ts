import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    console.log("---- EXTRACTED TEXT ----");
    console.log(normalizedText);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});