export type ManualData = {
    seller: {
        full_name: string;
        egn: string;
        id_card: {
            number: string;
            issue_date: string;
            issuer: string;
        };
        permanent_address: string;
    };

    buyer: {
        full_name: string;
        egn: string;
        id_card: {
            number: string;
            issue_date: string;
            issuer: string;
        };
        permanent_address: string;
    };

    deal: {
        sale_price_eur: number;
        deposit_eur: number;
        signing_date: string;
        preliminary_contract_date: string;
    };

    notary: {
        name: string;
        registry_number: string;
        region: string;
        office_address: string;
    };

    tax_evaluation: {
        amount_eur: number;
        certificate_number: string;
        certificate_date: string;
        issuer: string;
    };

    seller_bank: {
        name: string;
        bic: string;
        iban: string;
    };

    ownership_proof_text: string;
    presented_documents_text: string;
};