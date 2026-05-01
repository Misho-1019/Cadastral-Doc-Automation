import { PdfData } from "../parse/parseCadastreFields"
import { CalculatedData } from "./calculatedData";
import { DerivedData } from "./derivedData";
import { ManualData } from "./manualData";

export type DraftPayload = {
    pdf_data: PdfData;
    manual_data: ManualData;
    calculated_data: CalculatedData;
    derived_data: DerivedData;
}