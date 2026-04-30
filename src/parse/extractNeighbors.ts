type PdfNeighbors = {
    same_floor: string;
    below: string;
    above: string;
}

export function extractNeighbors(text: string): PdfNeighbors {
    const sameFloorMatch = text.match(/На същия етаж:\s*([0-9.]+)/i);
    const belowMatch = text.match(/Под обекта:\s*([0-9.]+)/i);
    const aboveMatch = text.match(/Над обекта:\s*([0-9.]+)/i);

    return {
        same_floor: sameFloorMatch?.[1]?.trim() ?? '',
        below: belowMatch?.[1]?.trim() ?? '',
        above: aboveMatch?.[1]?.trim() ?? '',
    }
}