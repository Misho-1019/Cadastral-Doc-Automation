import { formatAttachedParts } from "../format/formatAttachedParts";
import { formatCurrencyNumberBg } from "../format/formatCurrencyNumberBg";
import { formatMoneyToWordsBg } from "../format/formatMoneyToWordsBg";
import { formatPercentageBg } from "../format/formatPercentageBg";
import { formatPropertyAddress } from "../format/formatPropertyAddress";
import { PdfData } from "../parse/parseCadastreFields";
import { CalculatedData } from "../types/calculatedData";
import { DerivedData } from "../types/derivedData";
import { ManualData } from "../types/manualData";
import { buildCadastralDescriptionBlock } from "./buildCadastralDescriptionBlock";

export function buildDerivedData(pdfData: PdfData, manualData: ManualData, calculatedData: CalculatedData): DerivedData {
    const formattedPropertyAddress = formatPropertyAddress(pdfData.property_address);
    const formattedDepositPercent = formatPercentageBg(calculatedData.deposit_percent);
    const formattedAttachedParts = formatAttachedParts(pdfData.attached_parts);
    
    return {
        sale_price_eur_formatted: formatCurrencyNumberBg(manualData.sale_price_eur),
        sale_price_words: formatMoneyToWordsBg(manualData.sale_price_eur),
        deposit_eur_formatted: formatCurrencyNumberBg(manualData.deposit_eur),
        deposit_words: formatMoneyToWordsBg(manualData.deposit_eur),
        remaining_price_eur_formatted: formatCurrencyNumberBg(calculatedData.remaining_price_eur),
        remaining_price_words: formatMoneyToWordsBg(calculatedData.remaining_price_eur),
        formatted_property_address: formattedPropertyAddress,
        formatted_deposit_percent: formattedDepositPercent,
        formatted_attached_parts: formattedAttachedParts,
        cadastral_description_block: buildCadastralDescriptionBlock({ pdfData, formattedPropertyAddress, formattedAttachedParts })
    }
}