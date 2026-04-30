export function extractPropertyIdentifier(text: string): string {
    const match = text.match(/с идентификатор\s+([0-9.]+)/i);

    return match?.[1]?.trim() ?? '';
}