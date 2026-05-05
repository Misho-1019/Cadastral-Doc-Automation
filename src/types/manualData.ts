export type ManualData = {
    seller_full_name: string;
    seller_egn: string;
    buyer_full_name: string;
    buyer_egn: string;
    sale_price_eur: number;
    deposit_eur: number;
    signing_date: string;
    ownership_proof_text: string;
    tax_evaluation_amount_eur: number;
    tax_evaluation_certificate_number: string;
    tax_evaluation_certificate_date: string;
    tax_evaluation_issuer: string;
    seller_bank_name: string;
    seller_bank_bic: string;
    seller_bank_iban: string;
    preliminary_contract_date: string;
    notary_name: string;
    notary_registry_number: string;
    notary_region: string;
    notary_office_address: string;
    seller_id_card_number: string;
    seller_id_card_issue_date: string;
    seller_id_card_issuer: string;
    seller_permanent_address: string;

    buyer_id_card_number: string;
    buyer_id_card_issue_date: string;
    buyer_id_card_issuer: string;
    buyer_permanent_address: string;
    presented_documents_text: string;
}