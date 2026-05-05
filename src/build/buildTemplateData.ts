import { DraftPayload } from "../types/draftPayload";

export function buildTemplateData(payload: DraftPayload) {
    return {
        ...payload.derived_data,

        "seller.full_name": payload.manual_data.seller.full_name,
        "seller.egn": payload.manual_data.seller.egn,
        "seller.id_card.number": payload.manual_data.seller.id_card.number,
        "seller.id_card.issue_date": payload.manual_data.seller.id_card.issue_date,
        "seller.id_card.issuer": payload.manual_data.seller.id_card.issuer,
        "seller.permanent_address": payload.manual_data.seller.permanent_address,

        "buyer.full_name": payload.manual_data.buyer.full_name,
        "buyer.egn": payload.manual_data.buyer.egn,
        "buyer.id_card.number": payload.manual_data.buyer.id_card.number,
        "buyer.id_card.issue_date": payload.manual_data.buyer.id_card.issue_date,
        "buyer.id_card.issuer": payload.manual_data.buyer.id_card.issuer,
        "buyer.permanent_address": payload.manual_data.buyer.permanent_address,

        "deal.signing_date": payload.manual_data.deal.signing_date,
        "deal.preliminary_contract_date": payload.manual_data.deal.preliminary_contract_date,

        "notary.name": payload.manual_data.notary.name,
        "notary.region": payload.manual_data.notary.region,
        "notary.registry_number": payload.manual_data.notary.registry_number,
        "notary.office_address": payload.manual_data.notary.office_address,

        "tax_evaluation.certificate_number": payload.manual_data.tax_evaluation.certificate_number,
        "tax_evaluation.certificate_date": payload.manual_data.tax_evaluation.certificate_date,
        "tax_evaluation.issuer": payload.manual_data.tax_evaluation.issuer,

        "seller_bank.name": payload.manual_data.seller_bank.name,
        "seller_bank.bic": payload.manual_data.seller_bank.bic,
        "seller_bank.iban": payload.manual_data.seller_bank.iban,

        ownership_proof_text: payload.manual_data.ownership_proof_text,
        presented_documents_text: payload.manual_data.presented_documents_text
    };
}