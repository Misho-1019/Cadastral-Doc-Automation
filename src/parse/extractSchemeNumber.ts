export function extractSchemeNumber(text: string): string {
    const match = text.match(/Схема №\s*([0-9]{2}-[0-9]+-[0-9]{2}\.[0-9]{2}\.[0-9]{4})/i)

    return match?.[1]?.trim() ?? '';
}