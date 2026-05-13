export type NeighbouringObjects = {
    sameFloor: string | null;
    below: string | null;
    above: string | null;
};

export function extractNeighbouringObjects(text: string): NeighbouringObjects {
    const block = text.match(
        /Съседни\s+самостоятелни\s+обекти\s+в\s+сградата\s*:\s*(.*?)(?=\s+Предишен\s+идентификатор|\s+Собственици\s+по\s+данни|\s+Носители\s+на\s+вещни)/i
    )?.[1];

    if (!block) {
        return {
            sameFloor: null,
            below: null,
            above: null
        };
    }

    return {
        sameFloor: extractPart(block, /На\s+същия\s+етаж\s*:\s*(.*?)(?=\s+Под\s+обекта\s*:|\s+Над\s+обекта\s*:|$)/i),
        below: extractPart(block, /Под\s+обекта\s*:\s*(.*?)(?=\s+Над\s+обекта\s*:|$)/i),
        above: extractPart(block, /Над\s+обекта\s*:\s*(.*)$/i)
    };
}

function extractPart(text: string, pattern: RegExp): string | null {
    const match = text.match(pattern);

    if (!match?.[1]) {
        return null;
    }

    const raw = match[1];

    // extract all identifiers inside the block
    const identifiers = [...raw.matchAll(/([0-9]+(?:\.[0-9]+)+)/g)]
        .map(m => m[1]);

    if (identifiers.length === 0) {
        return null;
    }

    return identifiers.join(", ");
}