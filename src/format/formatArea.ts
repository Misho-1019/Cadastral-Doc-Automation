import { numberToWordsBg } from "./numberToWordsBg";

export function formatArea(area: string): string {
    const numeric = Number(area);

    if (Number.isNaN(numeric)) {
        return area;
    }

    return `${area} кв. м. (${numberToWordsBg(numeric)} квадратни метра)`;
}