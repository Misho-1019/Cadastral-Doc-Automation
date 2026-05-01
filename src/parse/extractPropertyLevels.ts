export function extractPropertyLevels(text: string): string {
    const match = text.match(/Брой нива на обекта:\s*([0-9]+)/i);
    
    return match?.[1]?.trim() ?? "";
}