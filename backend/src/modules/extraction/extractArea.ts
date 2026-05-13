export function extractArea(text: string): string | null {
    const labelledPatterns = [
        /Площ\s+на\s+самостоятелния\s+обект\s*:\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i,
        /Площ\s+на\s+имота\s*:\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i,
        /Застроена\s+площ\s*:\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i,
        /Площ\s*:\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i
    ];

    for (const pattern of labelledPatterns) {
        const match = text.match(pattern);

        if (match?.[1]) {
            return normalizeArea(match[1]);
        }
    }

    return null;
}

function normalizeArea(area: string): string {
    return area
        .replace(/\s+/g, " ")
        .replace(/кв\.?\s*м\.?/i, "кв.м")
        .trim();
}