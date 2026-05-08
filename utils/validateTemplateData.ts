import { TemplateData } from "../types/templateData.js";

export function validateTemplateData(data: any): data is TemplateData {
    return (
        typeof data.seller_name === "string" &&
        typeof data.buyer_name === "string" &&
        typeof data.contract_date === "string" &&
        typeof data.sale_price === "string" &&
        typeof data.deposit_amount === "string" &&
        typeof data.remaining_amount === "string"
    );
}