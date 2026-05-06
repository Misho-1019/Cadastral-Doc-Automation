export interface ParsedCadastralData {
    scheme_number: string;
    property_identifier: string;
    property_address: string;
    property_area: string;
    building_identifier: string;
    parcel_identifier: string;
    property_purpose: string;
    building_purpose: string;
    building_floors: string;
    property_levels: string;
    attached_parts: string;
    neighbors: {
        same_floor: string;
        below: string;
        above: string;
    };
}