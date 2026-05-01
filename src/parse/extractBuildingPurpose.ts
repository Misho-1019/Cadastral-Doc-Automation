export function extractBuildingPurpose(text: string): string {
    const match = text.match(/с предназначение:\s*([^,]+)/i);

    return match?.[1]?.trim() ?? '';
}