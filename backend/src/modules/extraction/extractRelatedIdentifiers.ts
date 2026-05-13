export type RelatedIdentifiers = {
    buildingIdentifier: string | null;
    landPropertyIdentifier: string | null;
};

export function extractRelatedIdentifiers(text: string): RelatedIdentifiers {
    const buildingIdentifier = extractFirst(text, [
        /сграда\s+с\s+идентификатор\s+([0-9]+(?:\.[0-9]+)+)/i,
        /Сграда\s+с\s+идентификатор\s+([0-9]+(?:\.[0-9]+)+)/i
    ]);

    const landPropertyIdentifier = extractFirst(text, [
        /поземлен\s+имот\s+с\s+идентификатор\s+([0-9]+(?:\.[0-9]+)+)/i,
        /Поземлен\s+имот\s+с\s+идентификатор\s+([0-9]+(?:\.[0-9]+)+)/i
    ]);

    return {
        buildingIdentifier,
        landPropertyIdentifier
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