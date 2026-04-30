import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { extractSchemeNumber } from "./parse/extractSchemeNumber";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const schemeNumber = extractSchemeNumber(normalizedText);

    console.log("---- SCHEME NUMBER ----");
    console.log(schemeNumber);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});