export type IndependentObjectDetails = {
    objectFloor: string | null;
    buildingFloors: string | null;
    levelsCount: string | null;
    purpose: string | null;
};

export function extractIndependentObjectDetails(text: string): IndependentObjectDetails {
    const objectFloor = extractFirst(text, [
        /Самостоятелният\s+обект\s+се\s+намира\s+на\s+етаж\s+([0-9]+)/i
    ]);

    const buildingFloors = extractFirst(text, [
        /брой\s+етажи\s*:\s*([0-9]+)/i
    ]);

    const levelsCount = extractFirst(text, [
        /Брой\s+нива\s+на\s+обекта\s*:\s*([0-9]+)/i
    ]);

    const purpose = extractFirst(text, [
        /Предназначение\s+на\s+самостоятелния\s+обект\s*:\s*(.*?)(?=\s+Брой\s+нива\s+на\s+обекта|\s+Площ\s+на\s+самостоятелния\s+обект|\s+Прилежащи\s+части)/i
    ]);

    return {
        objectFloor,
        buildingFloors,
        levelsCount,
        purpose: cleanText(purpose)
    };
}

function extractFirst(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
        const match = text.match(pattern);

        if (match?.[1]) {
            return match[1].trim();
        }
    }

    return null;
}

function cleanText(value: string | null): string | null {
    if (!value) {
        return null;
    }

    return value
        .replace(/\s+/g, " ")
        .trim();
}