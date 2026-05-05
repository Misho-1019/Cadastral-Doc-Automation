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

    if (!isNonEmptyString(payload.manual_data.seller_full_name)) {
        errors.push("manual_data.seller_full_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_egn)) {
        errors.push("manual_data.seller_egn is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_full_name)) {
        errors.push("manual_data.buyer_full_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_egn)) {
        errors.push("manual_data.buyer_egn is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.sale_price_eur)) {
        errors.push("manual_data.sale_price_eur is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.deposit_eur)) {
        errors.push("manual_data.deposit_eur is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.signing_date)) {
        errors.push("manual_data.signing_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.ownership_proof_text)) {
        errors.push("manual_data.ownership_proof_text is missing or invalid.");
    }

    if (!isValidNumber(payload.manual_data.tax_evaluation_amount_eur)) {
        errors.push("manual_data.tax_evaluation_amount_eur is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation_certificate_number)) {
        errors.push("manual_data.tax_evaluation_certificate_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation_certificate_date)) {
        errors.push("manual_data.tax_evaluation_certificate_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.tax_evaluation_issuer)) {
        errors.push("manual_data.tax_evaluation_issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank_name)) {
        errors.push("manual_data.seller_bank_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank_bic)) {
        errors.push("manual_data.seller_bank_bic is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_bank_iban)) {
        errors.push("manual_data.seller_bank_iban is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.preliminary_contract_date)) {
        errors.push("manual_data.preliminary_contract_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary_name)) {
        errors.push("manual_data.notary_name is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary_registry_number)) {
        errors.push("manual_data.notary_registry_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary_region)) {
        errors.push("manual_data.notary_region is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.notary_office_address)) {
        errors.push("manual_data.notary_office_address is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_id_card_number)) {
        errors.push("manual_data.seller_id_card_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_id_card_issue_date)) {
        errors.push("manual_data.seller_id_card_issue_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_id_card_issuer)) {
        errors.push("manual_data.seller_id_card_issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.seller_permanent_address)) {
        errors.push("manual_data.seller_permanent_address is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_id_card_number)) {
        errors.push("manual_data.buyer_id_card_number is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_id_card_issue_date)) {
        errors.push("manual_data.buyer_id_card_issue_date is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_id_card_issuer)) {
        errors.push("manual_data.buyer_id_card_issuer is missing or invalid.");
    }

    if (!isNonEmptyString(payload.manual_data.buyer_permanent_address)) {
        errors.push("manual_data.buyer_permanent_address is missing or invalid.");
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