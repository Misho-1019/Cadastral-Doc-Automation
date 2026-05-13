export type DocumentType = | "independentObjectScheme" | "landPropertySketch" | "buildingSketch" | "unknown";

export function detectDocumentType(text: string): DocumentType {
    const normalized = text.toUpperCase();

    if (normalized.includes("НА САМОСТОЯТЕЛЕН ОБЕКТ В СГРАДА ИЛИ В СЪОРЪЖЕНИЕ НА ТЕХНИЧЕСКАТА ИНФРАСТРУКТУРА")) {
        return "independentObjectScheme";
    }

    if (normalized.includes("СКИЦА НА ПОЗЕМЛЕН ИМОТ")) {
        return "landPropertySketch";
    }

    if (normalized.includes("СКИЦА НА СГРАДА")) {
        return "buildingSketch";
    }

    return "unknown";
}