import { PdfData } from "../parse/parseCadastreFields";
import { CalculatedData } from "../types/calculatedData";
import { DerivedData } from "../types/derivedData";
import { DraftPayload } from "../types/draftPayload";
import { ManualData } from "../types/manualData";

export function buildDraftPayload(pdfData: PdfData, manualData: ManualData, calculatedData: CalculatedData, derivedData: DerivedData): DraftPayload {
    return {
        pdf_data: pdfData,
        manual_data: manualData,
        calculated_data: calculatedData,
        derived_data: derivedData,
    }
}