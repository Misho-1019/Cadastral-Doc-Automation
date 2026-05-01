export function extractAttachedParts(text: string): string {
    const match = text.match(/Прилежащи части:\s*(.*?)\s*Ниво:/i);
    
    return match?.[1]?.trim() ?? "";
}