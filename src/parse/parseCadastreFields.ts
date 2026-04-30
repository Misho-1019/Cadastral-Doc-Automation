import { extractBuildingIdentifier } from "./extractBuildingIdentifier";
import { extractNeighbors } from "./extractNeighbors";
import { extractParcelIdentifier } from "./extractParcelIdentifier";
import { extractPropertyAdress } from "./extractPropertyAddress";
import { extractPropertyArea } from "./extractPropertyArea";
import { extractPropertyIdentifier } from "./extractPropertyIdentifier";
import { extractPropertyPurpose } from "./extractPropertyPurpose";
import { extractSchemeNumber } from "./extractSchemeNumber";

type PdfNeighbors = {
    same_floor: string;
    below: string;
    above: string;
}

export type PdfData = {
    scheme_number: string;
    property_identifier: string;
    property_address: string;
    property_area: string;
    building_identifier: string;
    parcel_identifier: string;
    property_purpose: string;
    neighbors: PdfNeighbors;
}

export function parseCadastreFields(text: string): PdfData {
    return {
        scheme_number: extractSchemeNumber(text),
        property_identifier: extractPropertyIdentifier(text),
        property_address: extractPropertyAdress(text),
        property_area: extractPropertyArea(text),
        building_identifier: extractBuildingIdentifier(text),
        parcel_identifier: extractParcelIdentifier(text),
        property_purpose: extractPropertyPurpose(text),
        neighbors: extractNeighbors(text),
    }
}