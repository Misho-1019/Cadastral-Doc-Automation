import { ParsedCadastralData } from "../../types/ParsedCadastralData";

export function buildFormDraftData(parsedData: ParsedCadastralData) {
    return {
        property: {
            scheme_number: parsedData.scheme_number,
            property_identifier: parsedData.property_identifier,
            property_address: parsedData.property_address,
            property_area: parsedData.property_area,
            building_identifier: parsedData.building_identifier,
            parcel_identifier: parsedData.parcel_identifier,
            property_purpose: parsedData.property_purpose,
            building_purpose: parsedData.building_purpose,
            building_floors: parsedData.building_floors,
            property_levels: parsedData.property_levels,
            attached_parts: parsedData.attached_parts,
            neighbors: parsedData.neighbors,
        },
        parties: {
            seller: {},
            buyer: {},
        },
        deal: {},
        documents: {},
        tax: {},
    };
}