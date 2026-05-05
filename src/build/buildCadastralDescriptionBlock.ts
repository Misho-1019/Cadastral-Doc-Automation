import { formatIdentifierWithWords } from "../format/formatIdentifierWithWords";
import { formatNeighborIdentifier } from "../format/formatNeighborIdentifier";
import { numberToWordsBg } from "../format/numberToWordsBg";
import { PdfData } from "../parse/parseCadastreFields";

type BuildCadastralDescriptionInput = {
    pdfData: PdfData,
    formattedPropertyAddress: string;
    formattedAttachedParts: string;
    formattedArea: string;
}

export function buildCadastralDescriptionBlock({ pdfData, formattedPropertyAddress, formattedAttachedParts, formattedArea }: BuildCadastralDescriptionInput): string {
    const propertyIdentifier = formatIdentifierWithWords(pdfData.property_identifier);
    const buildingIdentifier = formatIdentifierWithWords(pdfData.building_identifier);
    const parcelIdentifier = formatIdentifierWithWords(pdfData.parcel_identifier);

    const buildingFloorsNumber = Number(pdfData.building_floors);
    const propertyLevelsNumber = Number(pdfData.property_levels);

    const formattedBuildingFloors = Number.isNaN(buildingFloorsNumber) ? pdfData.building_floors : `${pdfData.building_floors} (${numberToWordsBg(buildingFloorsNumber)})`;

    const formattedPropertyLevels = Number.isNaN(propertyLevelsNumber) ? pdfData.property_levels : `${pdfData.property_levels} (${numberToWordsBg(propertyLevelsNumber)})`;

    return `- ${pdfData.property_purpose
        .toLowerCase()
        .replace(/^(.+?)[-–](.+)$/, (_, first, second) => {
            return `${first.trim().toUpperCase()} – ${second.trim()}`;
        })}, който съгласно Схема на самостоятелен обект в сграда № ${pdfData.scheme_number} г., издадена от АГКК, представлява самостоятелен обект в сграда с идентификатор ${propertyIdentifier}, по кадастралната карта и кадастралните регистри на гр. София, община Столична, област София (столица), одобрени със Заповед № РД-18-33/15.06.2010 г. на ИЗПЪЛНИТЕЛНИЯ ДИРЕКТОР НА АГКК, с адрес на самостоятелния обект: ${formattedPropertyAddress}, находящ се в сграда с идентификатор ${buildingIdentifier}, с предназначение: ${pdfData.building_purpose}, брой етажи: ${formattedBuildingFloors}, разположена в поземлен имот с идентификатор ${parcelIdentifier}, с предназначение на обекта: ${pdfData.property_purpose}, брой нива на обекта: ${formattedPropertyLevels}, с площ от ${formattedArea}, прилежащи части: ${formattedAttachedParts}, ниво: ${formattedPropertyLevels}, при съседи на самостоятелния обект: на същия етаж – ${formatNeighborIdentifier(pdfData.neighbors.same_floor)}, под обекта – ${formatNeighborIdentifier(pdfData.neighbors.below)}, над обекта – ${formatNeighborIdentifier(pdfData.neighbors.above)}`;
}