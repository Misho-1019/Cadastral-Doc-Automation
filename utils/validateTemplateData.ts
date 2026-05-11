import { TemplateData } from "../types/templateData.js";

export type ValidationErrors = Record<string, string>;

const requiredFields: Array<{
    key: keyof TemplateData;
    label: string;
}> = [
    { key: "seller_name", label: "Seller name" },
    { key: "seller_egn", label: "Seller EGN" },
    { key: "seller_id_card", label: "Seller ID card" },
    { key: "seller_id_issue_date", label: "Seller ID issue date" },
    { key: "seller_address", label: "Seller address" },

    { key: "buyer_name", label: "Buyer name" },
    { key: "buyer_egn", label: "Buyer EGN" },
    { key: "buyer_id_card", label: "Buyer ID card" },
    { key: "buyer_id_issue_date", label: "Buyer ID issue date" },
    { key: "buyer_address", label: "Buyer address" },

    { key: "contract_date", label: "Contract date" },
    { key: "notary_name", label: "Notary name" },
    { key: "preliminary_contract_date", label: "Preliminary contract date" },

    { key: "sale_price", label: "Sale price" },
    { key: "deposit_amount", label: "Deposit amount" },
    { key: "remaining_amount", label: "Remaining amount" },

    { key: "seller_bank_name", label: "Seller bank name" },
    { key: "seller_bank_bic", label: "Seller bank BIC" },
    { key: "seller_bank_iban", label: "Seller bank IBAN" },

    { key: "tax_evaluation", label: "Tax evaluation" },
];

export function validateTemplateData(data: unknown): {
    isValid: boolean;
    errors: ValidationErrors;
} {
    const errors: ValidationErrors = {};

    if (!data || typeof data !== "object") {
        return {
            isValid: false,
            errors: {
                data: "Request data is required.",
            },
        };
    }

    const templateData = data as Partial<Record<keyof TemplateData, unknown>>;

    for (const field of requiredFields) {
        const value = templateData[field.key];

        if (typeof value !== "string" || value.trim() === "") {
            errors[field.key] = `${field.label} is required.`;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}