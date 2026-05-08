import { decimalPercentageToWordsBG, numberToWordsBG } from './numberToWords.js';
import { ordinalToWordsBG } from './ordinalWords.js';

export function mapPdfToTemplateData(parsedData: any) {
    return {
        seller_name: parsedData.ownerName,

        property_identifier: parsedData.propertyIdentifier,
        property_identifier_words: parsedData.propertyIdentifier
            ? parsedData.propertyIdentifier
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        property_address_full: parsedData.propertyAddress,

        property_floor: parsedData.propertyFloor,
        property_floor_words: ordinalToWordsBG(parsedData.propertyFloor),

        property_apartment: parsedData.apartmentNumber,
        property_apartment_words: ordinalToWordsBG(parsedData.apartmentNumber),

        building_identifier: parsedData.buildingIdentifier,
        building_identifier_words: parsedData.buildingIdentifier
            ? parsedData.buildingIdentifier
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        parcel_identifier: parsedData.parcelIdentifier,
        parcel_identifier_words: parsedData.parcelIdentifier
            ? parsedData.parcelIdentifier
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        property_levels: parsedData.propertyLevels,
        property_levels_words: parsedData.propertyLevels
            ? numberToWordsBG(Number(parsedData.propertyLevels))
            : null,

        property_area: parsedData.propertyArea,
        property_area_words: parsedData.propertyArea
            ? numberToWordsBG(Number(parsedData.propertyArea))
            : null,

        attic_number: parsedData.atticNumber,
        attic_number_words: ordinalToWordsBG(parsedData.atticNumber),

        basement_number: parsedData.basementNumber,
        basement_number_words: ordinalToWordsBG(parsedData.basementNumber),

        common_parts_percentage: parsedData.commonPartsPercentage,
        common_parts_percentage_words: decimalPercentageToWordsBG(parsedData.commonPartsPercentage),

        neighbor_same_floor: parsedData.neighborSameFloor,
        neighbor_same_floor_words: parsedData.neighborSameFloor
            ? parsedData.neighborSameFloor
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        neighbor_below: parsedData.neighborBelow,
        neighbor_below_words: parsedData.neighborBelow
            ? parsedData.neighborBelow
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        neighbor_above: parsedData.neighborAbove,
        neighbor_above_words: parsedData.neighborAbove
            ? parsedData.neighborAbove
                .split('.')
                .map((part: string) => numberToWordsBG(Number(part)))
                .join(', точка, ')
            : null,

        cadastral_scheme_number: parsedData.cadastralSchemeNumber,
        cadastral_scheme_date: parsedData.cadastralSchemeDate,

        building_floors: parsedData.buildingFloors,
        building_floors_words: parsedData.buildingFloors
            ? numberToWordsBG(Number(parsedData.buildingFloors))
            : null,
    };
}