import { buildDerivedData } from "./build/buildDerivedData";
import { buildDraftPayload } from "./build/buildDraftPayload";
import { calculateDealData } from "./build/calculateDealData";
import { generateDocx } from "./build/generateDocx";
import { extractPdfText } from "./extract/extractPdfText";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { parseCadastreFields } from "./parse/parseCadastreFields";
import { ManualData } from "./types/manualData";
import { validateDraftPayload } from "./validate/validateDocumentInput";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const pdfData = parseCadastreFields(normalizedText);

    const manualData: ManualData = {
        seller_full_name: "ЕМИЛИЯ ИВАНОВА ГОРАНОВА-ВЕСТНЕР",
        seller_egn: "7208223211",
        buyer_full_name: "КАМЕЛИЯ АНГЕЛОВА АНГЕЛОВА-ТОДОРОВА",
        buyer_egn: "7507263057",
        sale_price_eur: 360000,
        deposit_eur: 36000,
        signing_date: "02.04.2026"
    };

    const calculatedData = calculateDealData(manualData);

    const derivedData = buildDerivedData(pdfData, manualData, calculatedData);

    const draftPayload = buildDraftPayload(pdfData, manualData, calculatedData, derivedData)

    const validationResult = validateDraftPayload(draftPayload);

    if (!validationResult.isValid) {
        console.error("Validation failed:");
        for (const error of validationResult.errors) {
            console.error(`- ${error}`);
        }

        process.exit(1);
    }

    generateDocx(draftPayload);

    console.log("DOCX generated successfully ✅");
}

main().catch(error => {
    console.error("Failed to generate DOCX:", error);
});