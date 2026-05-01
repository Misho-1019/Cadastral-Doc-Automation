import { CalculatedData } from "../types/calculatedData";
import { ManualData } from "../types/manualData";

export function calculateDealData(manualData: ManualData): CalculatedData {
    const remaining_price_eur = manualData.sale_price_eur - manualData.deposit_eur;

    const deposit_percent = manualData.sale_price_eur > 0 ? (manualData.deposit_eur / manualData.sale_price_eur) * 100 : 0;

    return {
        remaining_price_eur,
        deposit_percent,
    }
}