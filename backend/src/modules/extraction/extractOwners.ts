export type Owner = {
    name: string;
    ownershipDocument: string | null;
};

export function extractOwners(text: string): Owner[] {
    const block = text.match(
        /Собственици\s+по\s+данни\s+от\s+КРНИ\s*:\s*(.*?)(?=\s+Носители\s+на\s+вещни|\s+Права\s+върху\s+имота|$)/i
    )?.[1];

    if (!block) {
        return [];
    }

    const cleaned = block
        .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, " ")
        .replace(/София\s+1618.*?Код\s+за\s+достъп:\s*[a-z0-9]+/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    // split by owner names (anchor points)
    const nameRegex = /([А-ЯA-Z]{2,}(?:-[А-ЯA-Z]{2,})?\s+[А-ЯA-Z]{2,}\s+[А-ЯA-Z]{2,}(?:-[А-ЯA-Z]{2,})?)/g;

    const matches = [...cleaned.matchAll(nameRegex)];

    if (matches.length === 0) {
        return [];
    }

    const owners: Owner[] = [];

    for (let i = 0; i < matches.length; i++) {
        const current = matches[i];
        const next = matches[i + 1];

        const name = current[1];

        const start = current.index! + name.length;
        const end = next ? next.index! : cleaned.length;

        const segment = cleaned.slice(start, end);

        const ownershipDocumentMatch = segment.match(
            /(Договор\s+за\s+делба|Нотариален\s+акт).*$/i
        );

        owners.push({
            name,
            ownershipDocument: ownershipDocumentMatch
                ? ownershipDocumentMatch[0].trim()
                : null
        });
    }

    return owners;
}