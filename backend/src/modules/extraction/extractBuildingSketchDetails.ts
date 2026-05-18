export type BuildingSketchDetails = {
    sketchNumber: string | null;
    cadastralLocation: string | null;
    lastChangeDescription: string | null;
    landPropertyIdentifier: string | null;
    buildingFloors: string | null;
    purpose: string | null;
    independentObjectsCount: string | null;
    oldIdentifier: string | null;
    previousPlanNumber: string | null;
};

export function extractBuildingSketchDetails(text: string): BuildingSketchDetails {
    return {
        sketchNumber: extractFirst(text, [
            /Скица\s*№\s*([0-9]+-[0-9]+-[0-9.]+\s*г\.?)/i
        ]),
        cadastralLocation: extractFirst(text, [
            /СКИЦА\s+НА\s+СГРАДА\s*№\s*[^\n]+[\s\S]*?с\s+идентификатор\s+[0-9.]+\s+(.*?)(?=\s+По\s+кадастралната)/i
        ]),
        lastChangeDescription: extractFirst(text, [
            /Последно\s+изменение.*?е\s+от\s*(.*?)(?=\s+Адрес\s+на\s+сградата)/i
        ]),
        landPropertyIdentifier: extractFirst(text, [
            /Сградата\s+е\s+разположена\s+в\s+поземлен\s+имот\s+с\s+идентификатор\s*([0-9.]+)/i
        ]),
        buildingFloors: extractFirst(text, [
            /Брой\s+етажи\s*:\s*([0-9]+)/i
        ]),
        purpose: extractFirst(text, [
            /Предназначение\s*:\s*(.*?)(?=\s+Координатна\s+система|\s+Стар\s+идентификатор)/i
        ]),
        independentObjectsCount: extractFirst(text, [
            /Брой\s+самостоятелни\s+обекти\s+в\s+сградата\s*:\s*(.*?)(?=\s+Предназначение)/i
        ]),
        oldIdentifier: extractFirst(text, [
            /Стар\s+идентификатор\s*:\s*(.*?)(?=\s+Номер\s+по\s+предходен\s+план)/i
        ]),
        previousPlanNumber: extractFirst(text, [
            /Номер\s+по\s+предходен\s+план\s*:\s*(.*?)(?=\s+Собственици\s+по\s+данни)/i
        ])
    };
}

function extractFirst(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
        const match = text.match(pattern);

        if (match?.[1]) {
            return cleanText(match[1]);
        }
    }

    return null;
}

function cleanText(value: string | null): string | null {
    if (!value) {
        return null;
    }

    return value
        .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
        .replace(/^С\.\s/gi, "с. ")
        .replace(/\s+/g, " ")
        .replace(/кв\.?\s*м\.?/gi, "кв.м")
        .trim();
}