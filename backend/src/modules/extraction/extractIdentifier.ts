export function extractIdentifier(text: string): string | null {
    const matches = [...text.matchAll(/([0-9]+(?:\.[0-9]+)+)/g)];

    if (matches.length === 0) {
        return null;
    }

    // Step 1: prefer identifier near "самостоятелен обект"
    const objectMatch = text.match(
        /самостоятел[еe]н обект.*?([0-9]+(?:\.[0-9]+)+)/i
    );

    if (objectMatch?.[1]) {
        return objectMatch[1];
    }

    // Step 2: fallback → "с идентификатор"
    const identifierMatch = text.match(
        /с\s+идентификатор\s*([0-9]+(?:\.[0-9]+)+)/i
    );

    if (identifierMatch?.[1]) {
        return identifierMatch[1];
    }

    // Step 3: fallback → longest identifier (most segments)
    const sorted = matches
        .map(m => m[1])
        .sort((a, b) => b.split(".").length - a.split(".").length);

    return sorted[0] || null;
}