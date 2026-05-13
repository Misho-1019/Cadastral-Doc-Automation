import { BasicCadastralData } from "./parseCadastralData.js";

export type ValidationResult = {
    missingFields: string[];
    warnings: string[];
    isReady: boolean;
};

export function validateCadastralData(data: BasicCadastralData): ValidationResult {
    const missingFields: string[] = [];
    const warnings: string[] = [];

    // --- REQUIRED FIELDS ---
    if (!data.identifier) missingFields.push("identifier");
    if (!data.address) missingFields.push("address");
    if (!data.area) missingFields.push("area");

    // --- OWNERS ---
    if (!data.owners || data.owners.length === 0) {
        missingFields.push("owners");
    }

    // --- ADJOINING PARTS WARNINGS ---
    if (data.adjoiningParts) {
        const percentages = [...data.adjoiningParts.matchAll(/[0-9]+(?:[.,][0-9]+)?\s*%/g)];

        if (percentages.length > 1) {
            warnings.push("Adjoining parts contain multiple percentages — review carefully");
        }
    }

    // --- OWNERSHIP DOC WARNINGS ---
    data.owners.forEach((owner, index) => {
        if (!owner.ownershipDocument) {
            warnings.push(`Owner ${index + 1} is missing ownership document`);
        }
    });

    return {
        missingFields,
        warnings,
        isReady: missingFields.length === 0
    };
}