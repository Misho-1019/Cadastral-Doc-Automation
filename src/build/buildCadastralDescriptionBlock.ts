import { PdfData } from "../parse/parseCadastreFields";

export function buildCadastralDescriptionBlock(pdfData: PdfData): string {
    return `- ${pdfData.property_purpose}, който съгласно Схема на самостоятелен обект в сграда № ${pdfData.scheme_number} г., издадена от АГКК, представлява самостоятелен обект в сграда с идентификатор ${pdfData.property_identifier}, с адрес: ${pdfData.property_address}, находящ се в сграда с идентификатор ${pdfData.building_identifier}, разположена в поземлен имот с идентификатор ${pdfData.parcel_identifier}, с площ от ${pdfData.property_area} кв. м., при съседи: на същия етаж – ${pdfData.neighbors.same_floor}, под обекта – ${pdfData.neighbors.below}, над обекта – ${pdfData.neighbors.above}`
}