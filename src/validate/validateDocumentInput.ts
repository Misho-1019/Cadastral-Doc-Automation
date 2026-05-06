import { DraftPayload } from "../types/draftPayload";

type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

function isNonEmptyString(value: unknown): boolean {
    return typeof value === "string" && value.trim().length > 0;
}

function isValidNumber(value: unknown): boolean {
    return typeof value === "number" && !Number.isNaN(value);
}

export function validateDraftPayload(payload: DraftPayload): ValidationResult {
    const errors: string[] = [];

    if (!payload || typeof payload !== "object") {
        return {
            isValid: false,
            errors: ["Payload is missing or invalid."],
        };
    }

    if (!payload.manual_data) {
        return {
            isValid: false,
            errors: ["manual_data is missing."],
        };
    }

    if (!payload.pdf_data) {
        return {
            isValid: false,
            errors: ["pdf_data is missing."],
        };
    }

    if (!payload.calculated_data) {
        return {
            isValid: false,
            errors: ["calculated_data is missing."],
        };
    }

    if (!payload.derived_data) {
        return {
            isValid: false,
            errors: ["derived_data is missing."],
        };
    }

    if (!payload.manual_data.seller) {
        errors.push("manual_data.seller is missing.");
    }

    if (!payload.manual_data.buyer) {
        errors.push("manual_data.buyer is missing.");
    }

    if (!payload.manual_data.deal) {
        errors.push("manual_data.deal is missing.");
    }

    if (!payload.manual_data.notary) {
        errors.push("manual_data.notary is missing.");
    }

    if (!payload.manual_data.tax_evaluation) {
        errors.push("manual_data.tax_evaluation is missing.");
    }

    if (!payload.manual_data.seller_bank) {
        errors.push("manual_data.seller_bank is missing.");
    }

    if (errors.length > 0) {
        return {
            isValid: false,
            errors,
        };
    }

    if (!payload.manual_data.seller.id_card) {
        errors.push("manual_data.seller.id_card is missing.");
    }

    if (!payload.manual_data.buyer.id_card) {
        errors.push("manual_data.buyer.id_card is missing.");
    }

    if (errors.length > 0) {
        return {
            isValid: false,
            errors,
        };
    }

    if (!isNonEmptyString(payload.manual_data.seller.full_name)) {
        errors.push("manual_data.seller.full_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller.egn)) {
        errors.push("manual_data.seller.egn is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller.id_card.number)) {
        errors.push("manual_data.seller.id_card.number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller.id_card.issue_date)) {
        errors.push("manual_data.seller.id_card.issue_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller.id_card.issuer)) {
        errors.push("manual_data.seller.id_card.issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller.permanent_address)) {
        errors.push("manual_data.seller.permanent_address is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.full_name)) {
        errors.push("manual_data.buyer.full_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.egn)) {
        errors.push("manual_data.buyer.egn is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.id_card.number)) {
        errors.push("manual_data.buyer.id_card.number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.id_card.issue_date)) {
        errors.push("manual_data.buyer.id_card.issue_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.id_card.issuer)) {
        errors.push("manual_data.buyer.id_card.issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer.permanent_address)) {
        errors.push("manual_data.buyer.permanent_address is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.deal.sale_price_eur)) {
        errors.push("manual_data.deal.sale_price_eur is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.deal.deposit_eur)) {
        errors.push("manual_data.deal.deposit_eur is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.deal.signing_date)) {
        errors.push("manual_data.deal.signing_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.deal.preliminary_contract_date)) {
        errors.push("manual_data.deal.preliminary_contract_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary.name)) {
        errors.push("manual_data.notary.name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary.registry_number)) {
        errors.push("manual_data.notary.registry_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary.region)) {
        errors.push("manual_data.notary.region is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary.office_address)) {
        errors.push("manual_data.notary.office_address is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.tax_evaluation.amount_eur)) {
        errors.push("manual_data.tax_evaluation.amount_eur is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation.certificate_number)) {
        errors.push("manual_data.tax_evaluation.certificate_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation.certificate_date)) {
        errors.push("manual_data.tax_evaluation.certificate_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation.issuer)) {
        errors.push("manual_data.tax_evaluation.issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank.name)) {
        errors.push("manual_data.seller_bank.name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank.bic)) {
        errors.push("manual_data.seller_bank.bic is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank.iban)) {
        errors.push("manual_data.seller_bank.iban is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.ownership_proof_text)) {
        errors.push("manual_data.ownership_proof_text is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.presented_documents_text)) {
        errors.push("manual_data.presented_documents_text is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.scheme_number)) {
        errors.push("pdf_data.scheme_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.property_identifier)) {
        errors.push("pdf_data.property_identifier is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.property_address)) {
        errors.push("pdf_data.property_address is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.property_area)) {
        errors.push("pdf_data.property_area is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.building_identifier)) {
        errors.push("pdf_data.building_identifier is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.parcel_identifier)) {
        errors.push("pdf_data.parcel_identifier is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.property_purpose)) {
        errors.push("pdf_data.property_purpose is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.building_purpose)) {
        errors.push("pdf_data.building_purpose is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.building_floors)) {
        errors.push("pdf_data.building_floors is missing or invalid.");
    }

    if (!isNonEmptyString(payload.pdf_data.property_levels)) {
        errors.push("pdf_data.property_levels is missing or invalid.");
    }

    if (!isNonEmptyString(payload.derived_data.cadastral_description_block)) {
        errors.push("derived_data.cadastral_description_block is missing or invalid.");
    }

    if (!isValidNumber(payload.calculated_data.remaining_price_eur)) {
        errors.push("calculated_data.remaining_price_eur is missing or invalid.");
    }

    if (!isValidNumber(payload.calculated_data.deposit_percent)) {
        errors.push("calculated_data.deposit_percent is missing or invalid.");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}