import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { extractPropertyIdentifier } from "./parse/extractPropertyIdentifier";
import { extractSchemeNumber } from "./parse/extractSchemeNumber";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const schemeNumber = extractSchemeNumber(normalizedText);
    const propertyIdentifier = extractPropertyIdentifier(normalizedText)

    console.log("---- SCHEME NUMBER ----");
    console.log(schemeNumber);

    console.log("---- PROPERTY IDENTIFIER ----");
    console.log(propertyIdentifier);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});