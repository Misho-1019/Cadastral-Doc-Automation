import { formatCardinal } from "./numberWords.js";

export function formatPercentage(value: string): string {
    const match = value.match(/([0-9]+(?:\s*[.,]\s*[0-9]+)?)\s*%/);

    if (!match) {
        return value;
    }

    const rawNumber = match[1];
    const normalizedNumber = rawNumber
        .replace(/\s+/g, "")
        .replace(",", ".");

    const [integerPartStr, decimalPartStr] = normalizedNumber.split(".");

    const integerPart = Number(integerPartStr);
    const integerWords = formatCardinal(integerPart);

    let words: string;

    if (decimalPartStr && Number(decimalPartStr) > 0) {
        const decimalWords = formatCardinal(Number(decimalPartStr));
        words = `${integerWords} цяло и ${decimalWords} стотни върху сто`;
    } else {
        words = `${integerWords} процента`;
    }

    const displayNumber = normalizedNumber.includes(".")
        ? normalizedNumber
        : integerPartStr;

    return `${displayNumber} % (${words})`;
}