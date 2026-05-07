export function extractPropertyIdentifier(text: string): string | null {
    const match = text.match(/идентификатор\s+([\d.]+)/i);

    return match ? match[1] : null;
}