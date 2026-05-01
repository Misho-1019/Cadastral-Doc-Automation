import { formatMoneyToWordsBg } from "../format/formatMoneyToWordsBg";
import { PdfData } from "../parse/parseCadastreFields";
import { CalculatedData } from "../types/calculatedData";
import { DerivedData } from "../types/derivedData";
import { ManualData } from "../types/manualData";
import { buildCadastralDescriptionBlock } from "./buildCadastralDescriptionBlock";

export function buildDerivedData(pdfData: PdfData, manualData: ManualData, calculatedData: CalculatedData): DerivedData {
    return {
        sale_price_words: formatMoneyToWordsBg(manualData.sale_price_eur),
        deposit_words: formatMoneyToWordsBg(manualData.deposit_eur),
        remaining_price_words: formatMoneyToWordsBg(calculatedData.remaining_price_eur),
        cadastral_description_block: buildCadastralDescriptionBlock(pdfData),
    }
}