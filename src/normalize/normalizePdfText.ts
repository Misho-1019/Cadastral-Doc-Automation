export function normalizePdfText(rawText: string): string {
    return rawText.replace(/\r/g, "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}