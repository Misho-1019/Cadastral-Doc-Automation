export function extractBuildingIdentifier(text: string): string {
    const match = text.match(/в сграда с идентификатор\s+([0-9.]+)/i);

    return match?.[1]?.replace(/,$/, '').trim() ?? '';
}