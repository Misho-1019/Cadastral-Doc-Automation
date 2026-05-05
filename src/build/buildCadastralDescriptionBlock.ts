import { formatIdentifierWithWords } from "../format/formatIdentifierWithWords";
import { formatNeighborIdentifier } from "../format/formatNeighborIdentifier";
import { numberToWordsBg } from "../format/numberToWordsBg";
import { PdfData } from "../parse/parseCadastreFields";

type BuildCadastralDescriptionInput = {
    pdfData: PdfData,
    formattedPropertyAddress: string;
    formattedAttachedParts: string;
}

export function buildCadastralDescriptionBlock({ pdfData, formattedPropertyAddress, formattedAttachedParts }: BuildCadastralDescriptionInput): string {
    const propertyIdentifier = formatIdentifierWithWords(pdfData.property_identifier);
    const buildingIdentifier = formatIdentifierWithWords(pdfData.building_identifier);
    const parcelIdentifier = formatIdentifierWithWords(pdfData.parcel_identifier);

    const buildingFloorsNumber = Number(pdfData.building_floors);
    const propertyLevelsNumber = Number(pdfData.property_levels);

    const formattedBuildingFloors = Number.isNaN(buildingFloorsNumber) ? pdfData.building_floors : `${pdfData.building_floors} (${numberToWordsBg(buildingFloorsNumber)})`;

    const formattedPropertyLevels = Number.isNaN(propertyLevelsNumber) ? pdfData.property_levels : `${pdfData.property_levels} (${numberToWordsBg(propertyLevelsNumber)})`;

    return `- ${pdfData.property_purpose.toUpperCase()}, който съгласно Схема на самостоятелен обект в сграда № ${pdfData.scheme_number} г., издадена от АГКК, представлява самостоятелен обект в сграда с идентификатор ${propertyIdentifier}, с адрес на самостоятелния обект: ${formattedPropertyAddress}, находящ се в сграда с идентификатор ${buildingIdentifier}, с предназначение: ${pdfData.building_purpose}, брой етажи: ${formattedBuildingFloors}, разположена в поземлен имот с идентификатор ${parcelIdentifier}, с предназначение на обекта: ${pdfData.property_purpose}, брой нива на обекта: ${formattedPropertyLevels}, с площ от ${pdfData.property_area} кв. м., прилежащи части: ${formattedAttachedParts}, при съседи на самостоятелния обект: на същия етаж – ${formatNeighborIdentifier(pdfData.neighbors.same_floor)}, под обекта – ${formatNeighborIdentifier(pdfData.neighbors.below)}, над обекта – ${formatNeighborIdentifier(pdfData.neighbors.above)}`;
}