import type { CadastralExtractedData } from "../types/cadastral.types.js";

export function generateDescription(data: CadastralExtractedData): string {
    return `
${data.documentType} с идентификатор ${data.identifier},
с адрес ${data.address},
с площ ${data.area},
с предназначение ${data.purpose}.
    `.trim();
}