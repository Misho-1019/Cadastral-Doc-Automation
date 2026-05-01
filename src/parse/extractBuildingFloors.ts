export function extractBuildingFloors(text: string): string {
    const match = text.match(/брой етажи:\s*([0-9]+)/i);

    return match?.[1]?.trim() ?? '';
}