export type LandBuilding = {
    identifier: string;
    builtArea: string | null;
    floors: string | null;
    purpose: string | null;
};

export type LandPropertyDetails = {
    sketchNumber: string | null;
    territoryPurpose: string | null;
    permanentUse: string | null;
    previousIdentifier: string | null;
    previousPlanNumber: string | null;
    quarter: string | null;
    plot: string | null;
    neighbours: string | null;
    buildings: LandBuilding[];
};

export function extractLandPropertyDetails(text: string): LandPropertyDetails {
    return {
        sketchNumber: extractFirst(text, [
            /Скица\s*№\s*([0-9]+-[0-9]+-[0-9.]+\s*г\.?)/i
        ]),
        territoryPurpose: extractFirst(text, [
            /Трайно\s+предназначение\s+на\s+територията\s*:\s*(.*?)(?=\s+Начин\s+на\s+трайно\s+ползване)/i
        ]),
        permanentUse: extractFirst(text, [
            /Начин\s+на\s+трайно\s+ползване\s*:\s*(.*?)(?=\s+Координатна\s+система|\s+Предишен\s+идентификатор)/i
        ]),
        previousIdentifier: extractFirst(text, [
            /Предишен\s+идентификатор\s*:\s*(.*?)(?=\s+Номер\s+по\s+предходен\s+план)/i
        ]),
        previousPlanNumber: extractFirst(text, [
            /Номер\s+по\s+предходен\s+план\s*:\s*([^,]+)/i
        ]),
        quarter: extractFirst(text, [
            /квартал\s*:\s*([^,]+)/i
        ]),
        plot: extractFirst(text, [
            /парцел\s*:\s*([IVXLCDMА-ЯA-Z0-9]+)/i
        ]),
        neighbours: extractFirst(text, [
            /Съседи\s*:\s*(.*?)(?=\s+Собственици\s+по\s+данни)/i
        ]),
        buildings: extractBuildings(text)
    };
}

function extractBuildings(text: string): LandBuilding[] {
    const block = text.match(
        /Сгради,\s+които\s+попадат\s+върху\s+имота\s*(.*)$/i
    )?.[1];

    if (!block) {
        return [];
    }

    const buildingRegex =
        /Сграда\s+([0-9]+(?:\.[0-9]+)+)\s*:\s*застроена\s+площ\s+([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?),\s*брой\s+етажи\s+([0-9]+),\s*предназначение\s*:\s*(.*?)(?=\s+[0-9]+\.\s*Сграда|$)/gi;

    return [...block.matchAll(buildingRegex)].map(match => ({
        identifier: cleanText(match[1]) ?? "",
        builtArea: cleanText(match[2]),
        floors: cleanText(match[3]),
        purpose: cleanText(match[4])
    }));
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
        .replace(/\s+/g, " ")
        .replace(/кв\.?\s*м\.?/gi, "кв.м")
        .trim();
}