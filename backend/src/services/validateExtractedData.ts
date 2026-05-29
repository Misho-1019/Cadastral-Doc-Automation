import type { CadastralExtractedData } from "../types/cadastral.types.js";

type RequiredField = {
    key: keyof CadastralExtractedData;
    label: string;
};

const requiredFieldsByDocumentType: Record<string, RequiredField[]> = {
    INDEPENDENT_OBJECT: [
        { key: "identifier", label: "identifier" },
        { key: "address", label: "address" },
        { key: "area", label: "area" },
        { key: "objectPurpose", label: "objectPurpose" },
        { key: "buildingIdentifier", label: "buildingIdentifier" },
        { key: "landIdentifier", label: "landIdentifier" },
        { key: "floor", label: "floor" },
    ],

    LAND_PROPERTY: [
        { key: "identifier", label: "identifier" },
        { key: "address", label: "address" },
        { key: "area", label: "area" },
        { key: "territoryPurpose", label: "territoryPurpose" },
        { key: "permanentUsage", label: "permanentUsage" },
        { key: "landNeighbours", label: "landNeighbours" },
    ],

    BUILDING: [
        { key: "identifier", label: "identifier" },
        { key: "address", label: "address" },
        { key: "landIdentifier", label: "landIdentifier" },
        { key: "builtUpArea", label: "builtUpArea" },
        { key: "floors", label: "floors" },
        { key: "purpose", label: "purpose" },
    ],
};

function isMissingValue(value: unknown): boolean {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === "string" && value.trim() === "") {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    return false;
}

export function validateExtractedData(
    data: CadastralExtractedData,
    detectedDocumentType: string
): string[] {
    const requiredFields = requiredFieldsByDocumentType[detectedDocumentType];

    if (!requiredFields) {
        return [`Unsupported document type for validation: ${detectedDocumentType}`];
    }

    const errors: string[] = [];

    for (const field of requiredFields) {
        if (isMissingValue(data[field.key])) {
            errors.push(`Missing required field: ${field.label}`);
        }
    }

    return errors;
}