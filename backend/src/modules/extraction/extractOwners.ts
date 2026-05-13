export function extractOwners(text: string): string[] {
    const block = text.match(
        /Собственици\s+по\s+данни\s+от\s+КРНИ\s*:\s*(.*?)(?=\s+Носители\s+на\s+вещни|\s+Права\s+върху\s+имота|$)/i
    )?.[1];

    if (!block) {
        return [];
    }

    const cleanedBlock = block
        .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, " ")
        .replace(/София\s+1618.*?Код\s+за\s+достъп:\s*[a-z0-9]+/gi, " ")
        .replace(/Няма\s+данни\s+за\s+идеалните\s+части/gi, " ")
        .replace(/Договор\s+за\s+делба.*?(?=[А-ЯA-Z]{2,}\s+[А-ЯA-Z]{2,}\s+[А-ЯA-Z]{2,}|$)/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    const owners = cleanedBlock.match(
        /[А-ЯA-Z]{2,}(?:-[А-ЯA-Z]{2,})?\s+[А-ЯA-Z]{2,}\s+[А-ЯA-Z]{2,}(?:-[А-ЯA-Z]{2,})?/g
    );

    return owners ?? [];
}