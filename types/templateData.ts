export type TemplateData = {
    seller_name: string;
    buyer_name: string;

    contract_date: string;
    contract_date_words: string;

    sale_price: string;
    sale_price_words?: string;

    property_identifier?: string | null;
    property_identifier_words?: string | null;

    property_address_full?: string | null;

    property_floor?: string | null;
    property_floor_words?: string | null;

    property_apartment?: string | null;
    property_apartment_words?: string | null;

    building_identifier?: string | null;
    building_identifier_words?: string | null;

    building_floors?: string | null;
    building_floors_words?: string | null;

    parcel_identifier?: string | null;
    parcel_identifier_words?: string | null;

    property_levels?: string | null;
    property_levels_words?: string | null;

    property_area?: string | null;
    property_area_words?: string | null;

    attic_number?: string | null;
    attic_number_words?: string | null;

    basement_number?: string | null;
    basement_number_words?: string | null;

    common_parts_percentage?: string | null;
    common_parts_percentage_words?: string | null;

    neighbor_same_floor?: string | null;
    neighbor_same_floor_words?: string | null;

    neighbor_below?: string | null;
    neighbor_below_words?: string | null;

    neighbor_above?: string | null;
    neighbor_above_words?: string | null;

    preliminary_contract_date?: string;
    deposit_amount?: string;
    deposit_amount_words?: string;

    remaining_amount?: string;
    remaining_amount_words?: string;

    seller_bank_name?: string;
    seller_bank_bic?: string;
    seller_bank_iban?: string;

    tax_evaluation?: string;
    tax_evaluation_words?: string;

    notary_name?: string;

    seller_egn?: string;
    seller_id_card?: string;
    seller_id_issue_date?: string;
    seller_address?: string;

    buyer_egn?: string;
    buyer_id_card?: string;
    buyer_id_issue_date?: string;
    buyer_address?: string;
};