import type { CadastralExtractedData } from "../types/cadastral.types.js";

export function validateExtractedData(data: CadastralExtractedData): string[] {
    const errors: string[] = [];

    if (!data.documentType) {
        errors.push("Missing documentType");
    }

    if (!data.identifier) {
        errors.push("Missing identifier");
    }

    if (!data.address) {
        errors.push("Missing address");
    }

    return errors;
}