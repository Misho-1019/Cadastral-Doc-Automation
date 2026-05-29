import type { BuildingData } from "../types/building.types.js";
import type { CadastralExtractedData } from "../types/cadastral.types.js";
import type { IndependentObjectData } from "../types/independentObject.types.js";
import type { LandPropertyData } from "../types/landProperty.types.js";
import { formatBuildingDescription } from "./formatBuildingDescription.js";
import { formatIndependentObjectDescription } from "./formatIndependentObjectDescription.js";
import { formatLandPropertyDescription } from "./formatLandPropertyDescription.js";

export function generateCadastralDescription(documentType: string, data: CadastralExtractedData): string {
    switch (documentType) {
        case "INDEPENDENT_OBJECT":
            return formatIndependentObjectDescription(data as IndependentObjectData);

        case "LAND_PROPERTY":
            return formatLandPropertyDescription(data as LandPropertyData);

        case "BUILDING":
            return formatBuildingDescription(data as BuildingData);

        default:
            return "Unsupported cadastral document type.";
    }
}