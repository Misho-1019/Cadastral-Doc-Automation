import type { CadastralExtractedData } from "../types/cadastral.types.js";
import type { IndependentObjectData } from "../types/independentObject.types.js";
import { formatIndependentObjectDescription } from "./formatIndependentObjectDescription.js";

export function generateCadastralDescription(documentType: string, data: CadastralExtractedData): string {
    switch (documentType) {
        case "INDEPENDENT_OBJECT":
            return formatIndependentObjectDescription(data as IndependentObjectData);

        case "LAND_PROPERTY":
            return "LAND_PROPERTY description generation is not implemented yet.";

        case "BUILDING":
            return "BUILDING description generation is not implemented yet.";

        default:
            return "Unsupported cadastral document type.";
    }
}