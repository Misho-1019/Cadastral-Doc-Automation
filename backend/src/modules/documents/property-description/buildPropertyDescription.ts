import { BasicCadastralData } from "../../extraction/parseCadastralData.js";
import { buildBuildingDescription } from "./buildBuildingDescription.js";
import { buildIndependentObjectDescription } from "./buildIndependentObjectDescription.js";
import { buildLandPropertyDescription } from "./buildLandPropertyDescription.js";

export function buildPropertyDescription(data: BasicCadastralData): string {
    if (data.documentType === "independentObjectScheme") {
        return buildIndependentObjectDescription(data);
    }

    if (data.documentType === "landPropertySketch") {
        return buildLandPropertyDescription(data);
    }

    if (data.documentType === "buildingSketch") {
        return buildBuildingDescription(data);
    }

    return "Неподдържан тип кадастрален документ.";
}