import { DocumentType } from "./detectDocumentType.js";
import { ParsedCadastralData } from "./parseCadastralData.js";

export type LLMValidationResult = {
    isValid: boolean;
    criticalFailures: string[];
    warnings: string[];
};

const IDENTIFIER_PATTERN = /^[0-9]+(?:\.[0-9]+)+$/;

export function validateLLMOutput(
    data: ParsedCadastralData,
    documentType: DocumentType
): LLMValidationResult {
    const criticalFailures: string[] = [];
    const warnings: string[] = [];

    if (!data.identifier || !IDENTIFIER_PATTERN.test(data.identifier)) {
        criticalFailures.push("identifier");
    }

    if (!data.address) {
        criticalFailures.push("address");
    }

    if (!data.area) {
        criticalFailures.push("area");
    } else if (!/\d/.test(data.area) || !/кв\.?\s*м/i.test(data.area)) {
        warnings.push("area has unexpected format");
    }

    if (!data.owners || data.owners.length === 0) {
        criticalFailures.push("owners");
    } else {
        data.owners.forEach((owner, i) => {
            if (!owner.name) {
                warnings.push(`Owner ${i + 1} has empty name`);
            }
        });
    }

    if (data.area && typeof data.area === "string" && data.area.length > 100) {
        warnings.push("area field is unusually long — may be incorrect");
    }

    if (data.address && typeof data.address === "string" && data.address.length > 500) {
        warnings.push("address field is unusually long — may be incorrect");
    }

    if (data.owners && Array.isArray(data.owners)) {
        const nonObjectOwners = data.owners.filter(o => typeof o !== "object" || o === null);

        if (nonObjectOwners.length > 0) {
            criticalFailures.push("owners has invalid structure");
        }
    }

    return {
        isValid: criticalFailures.length === 0,
        criticalFailures,
        warnings
    };
}
