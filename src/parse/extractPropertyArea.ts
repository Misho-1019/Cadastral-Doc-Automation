export function extractPropertyArea(text: string): string {
    const match = text.match(/Площ на самостоятелния обект:\s*([0-9]+(?:\.[0-9]+)?)/i);

    return match?.[1]?.trim() ?? '';
}