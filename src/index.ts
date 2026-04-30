import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { extractBuildingIdentifier } from "./parse/extractBuildingIdentifier";
import { extractParcelIdentifier } from "./parse/extractParcelIdentifier";
import { extractPropertyAdress } from "./parse/extractPropertyAddress";
import { extractPropertyArea } from "./parse/extractPropertyArea";
import { extractPropertyIdentifier } from "./parse/extractPropertyIdentifier";
import { extractSchemeNumber } from "./parse/extractSchemeNumber";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const schemeNumber = extractSchemeNumber(normalizedText);
    const propertyIdentifier = extractPropertyIdentifier(normalizedText)
    const propertyAdress = extractPropertyAdress(normalizedText)
    const propertyArea = extractPropertyArea(normalizedText);
    const buildingIdentifier = extractBuildingIdentifier(normalizedText);
    const parcelIdentifier = extractParcelIdentifier(normalizedText);

    console.log("---- SCHEME NUMBER ----");
    console.log(schemeNumber);

    console.log("---- PROPERTY IDENTIFIER ----");
    console.log(propertyIdentifier);

    console.log("---- PROPERTY ADDRESS ----");
    console.log(propertyAdress);

    console.log("---- PROPERTY AREA ----");
    console.log(propertyArea);

    console.log("---- BUILDING IDENTIFIER ----");
    console.log(buildingIdentifier);

    console.log("---- PARCEL IDENTIFIER ----");
    console.log(parcelIdentifier);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});