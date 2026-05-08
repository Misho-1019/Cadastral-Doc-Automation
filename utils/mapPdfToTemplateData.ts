import { numberToWordsBG } from "./numberToWords.js";
import { ordinalToWordsBG } from "./ordinalWords.js";

export function mapPdfToTemplateData(parsedData: any) {
    return {
        seller_name: parsedData.ownerName,

        property_identifier: parsedData.propertyIdentifier,
        property_address_full: parsedData.propertyAddress,
        property_area: parsedData.propertyArea,
        property_floor: parsedData.propertyFloor,
        property_apartment: parsedData.apartmentNumber,

        building_identifier: parsedData.buildingIdentifier,
        parcel_identifier: parsedData.parcelIdentifier,

        attic_number: parsedData.atticNumber,
        basement_number: parsedData.basementNumber,
        common_parts_percentage: parsedData.commonPartsPercentage,

        neighbor_same_floor: parsedData.neighborSameFloor,
        neighbor_below: parsedData.neighborBelow,
        neighbor_above: parsedData.neighborAbove,

        property_floor_words: ordinalToWordsBG(parsedData.propertyFloor),
        property_apartment_words: ordinalToWordsBG(parsedData.apartmentNumber),
        attic_number_words: ordinalToWordsBG(parsedData.atticNumber),
        basement_number_words: ordinalToWordsBG(parsedData.basementNumber),
        property_levels_words: parsedData.propertyLevels ? numberToWordsBG(Number(parsedData.propertyLevels)) : null,
    };
}