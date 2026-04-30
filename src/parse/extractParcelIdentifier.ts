export function extractParcelIdentifier(text: string): string {
    const match = text.match(/поземлен имот с идентификатор\s+([0-9.]+)/i);

    return match?.[1]?.trim() ?? '';
}