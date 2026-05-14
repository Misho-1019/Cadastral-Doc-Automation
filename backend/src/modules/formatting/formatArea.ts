import { formatCardinal } from "./numberWords.js";

export function formatArea(area: string): string {
    const match = area.match(/([0-9]+(?:[.,][0-9]+)?)\s*кв\.м/i);

    if (!match) {
        return area;
    }

    const rawNumber = match[1].replace(",", ".");
    const [integerPartStr, decimalPartStr] = rawNumber.split(".");

    const integerPart = Number(integerPartStr);
    const integerWords = formatCardinal(integerPart);

    let resultWords = integerWords;

    if (decimalPartStr) {
        const decimalPart = Number(decimalPartStr);

        if (decimalPart > 0) {
            const decimalWords = formatCardinal(decimalPart);

            resultWords += ` цяло и ${decimalWords} стотни`;
        }
    }

    resultWords += " квадратни метра";

    return `${area} (${resultWords})`;
}