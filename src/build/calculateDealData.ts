import { CalculatedData } from "../types/calculatedData";
import { ManualData } from "../types/manualData";

export function calculateDealData(manualData: ManualData): CalculatedData {
    const salePrice = manualData.deal.sale_price_eur;
    const deposit = manualData.deal.deposit_eur;

    const remaining_price_eur = salePrice - deposit;

    const deposit_percent = salePrice > 0
        ? (deposit / salePrice) * 100
        : 0;

    return {
        remaining_price_eur,
        deposit_percent,
    };
}