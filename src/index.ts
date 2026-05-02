import { buildDerivedData } from "./build/buildDerivedData";
import { buildDraftPayload } from "./build/buildDraftPayload";
import { calculateDealData } from "./build/calculateDealData";
import { generateDocx } from "./build/generateDocx";
import { extractPdfText } from "./extract/extractPdfText";
import { loadManualData } from "./loaders/loadManualData";
import { normalizePdfText } from "./normalize/normalizePdfText";
import { parseCadastreFields } from "./parse/parseCadastreFields";
import { validateDraftPayload } from "./validate/validateDocumentInput";

async function main() {
    const rawText = await extractPdfText('./input/sample.pdf');
    const normalizedText = normalizePdfText(rawText)

    const pdfData = parseCadastreFields(normalizedText);

    const manualData = loadManualData("./input/manualData.json");

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

    generateDocx(
        draftPayload,
        "./templates/notarial-act-template-v1.docx",
        "./output/result.docx"
    );

    console.log("DOCX generated successfully ✅");
}

main().catch(error => {
    console.error("Failed to generate DOCX:", error);
});