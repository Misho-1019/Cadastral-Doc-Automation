import { formatArea } from "./formatArea.js";
import { formatOrdinal } from "./formatOrdinal.js";
import { formatPercentage } from "./formatPercentage.js";
import { formatCardinal } from "./numberWords.js";

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

    // integers (like "таван 6", "изба 5", "мазе №5")
    formatted = formatted.replace(
        /(таван|изба|мазе)\s*(№)?\s*([0-9]+)/giu,
        (_, label, symbol, numStr) => {
            const num = Number(numStr);
            const words = formatCardinal(num);

            const prefix = symbol ? "№" : "";

            return `${label} ${prefix}${num} (${words})`;
        }
    );

    formatted = formatted.replace(
        /(етаж|апартамент)\s*(№)?\s*([0-9]+)/giu,
        (_, label, symbol, numStr) => {
            const num = Number(numStr);
            const ordinal = formatOrdinal(num);

            const prefix = symbol ? "№" : "";

            return `${label} ${prefix}${num} (${ordinal})`;
        }
    );

    return formatted;
}