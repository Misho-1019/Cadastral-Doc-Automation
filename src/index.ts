import { buildCadastralDescriptionBlock } from "./build/buildCadastralDescriptionBlock";
import { calculateDealData } from "./build/calculateDealData";
import { extractPdfText } from "./extract/extractPdfText";
import { formatMoneyToWordsBg } from "./format/formatMoneyToWordsBg";
import { numberToWordsBg } from "./format/numberToWordsBg";
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

    const manualData = {
        seller_full_name: "ЕМИЛИЯ ИВАНОВА ГОРАНОВА-ВЕСТНЕР",
        seller_egn: "7208223211",
        buyer_full_name: "КАМЕЛИЯ АНГЕЛОВА АНГЕЛОВА-ТОДОРОВА",
        buyer_egn: "7507263057",
        sale_price_eur: 360000,
        deposit_eur: 36000,
        signing_date: "02.04.2026"
    };

    const calculatedData = calculateDealData(manualData);

    const salePriceWords = formatMoneyToWordsBg(manualData.sale_price_eur);
    const depositWords = formatMoneyToWordsBg(manualData.deposit_eur);
    const remainingPriceWords = formatMoneyToWordsBg(calculatedData.remaining_price_eur)

    const taxExampleWords = formatMoneyToWordsBg(48492.9);

    const cadastralDescriptionBlock = buildCadastralDescriptionBlock(pdfData);

    console.log("---- PDF DATA ----");
    console.log(pdfData);

    console.log("---- MANUAL DATA ----");
    console.log(manualData);

    console.log("---- CALCULATED DATA ----");
    console.log(calculatedData);

    console.log("---- MONEY WORDS ----");
    console.log({
        salePriceWords,
        depositWords,
        remainingPriceWords,
        taxExampleWords
    });

    console.log("---- CADASTRAL DESCRIPTION BLOCK ----");
    console.log(cadastralDescriptionBlock);
}

main().catch(error => {
    console.error("Failed to extract PDF text:", error);
});