import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { extractBuildingIdentifier } from "./parse/extractBuildingIdentifier";
import { extractNeighbors } from "./parse/extractNeighbors";
import { extractParcelIdentifier } from "./parse/extractParcelIdentifier";
import { extractPropertyAdress } from "./parse/extractPropertyAddress";
import { extractPropertyArea } from "./parse/extractPropertyArea";
import { extractPropertyIdentifier } from "./parse/extractPropertyIdentifier";
import { extractPropertyPurpose } from "./parse/extractPropertyPurpose";
import { extractSchemeNumber } from "./parse/extractSchemeNumber";
import { parseCadastreFields } from "./parse/parseCadastreFields";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const pdfData = parseCadastreFields(normalizedText);

    console.log("---- PDF DATA ----");
    console.log(pdfData);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});