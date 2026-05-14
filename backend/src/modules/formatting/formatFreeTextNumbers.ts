import { formatArea } from "./formatArea.js";
import { formatPercentage } from "./formatPercentage.js";

export function formatFreeTextNumbers(text: string): string {
    let formatted = text;

    formatted = formatted.replace(
        /[0-9]+(?:\s*[.,]\s*[0-9]+)?\s*%/g,
        match => formatPercentage(match)
    );

    formatted = formatted.replace(
        /[0-9]+(?:[.,][0-9]+)?\s*кв\.м/g,
        match => formatArea(match)
    );

    return formatted;
}