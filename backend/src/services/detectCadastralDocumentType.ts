export type CadastralDocumentType = | "INDEPENDENT_OBJECT" | "LAND_PROPERTY" | "BUILDING" | "UNKNOWN";

function normalizeText(text: string) {
    return text
        .toUpperCase()
        .replace(/\s+/g, " ")
        .trim();
}

export function detectCadastralDocumentType(text: string): CadastralDocumentType {
    const normalizedText = normalizeText(text);

    if (
        normalizedText.includes("САМОСТОЯТЕЛЕН ОБЕКТ В СГРАДА") ||
        normalizedText.includes("НА САМОСТОЯТЕЛЕН ОБЕКТ")
    ) {
        return "INDEPENDENT_OBJECT";
    }

    if (normalizedText.includes("СКИЦА НА ПОЗЕМЛЕН ИМОТ")) {
        return "LAND_PROPERTY";
    }

    if (normalizedText.includes("СКИЦА НА СГРАДА")) {
        return "BUILDING";
    }

    return 'UNKNOWN';
}