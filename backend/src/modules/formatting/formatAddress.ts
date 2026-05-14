import { formatOrdinal } from "./formatOrdinal.js";
import { formatCardinal } from "./numberWords.js";

export function formatAddress(address: string): string {
    let formatted = address;

    // --- Roman numerals (e.g. "II")
    formatted = formatted.replace(
        /\b(I|II|III|IV|V|VI|VII|VIII|IX|X)\b/g,
        (match) => {
            const value = romanToNumber(match);
            const ordinal = formatOrdinal(value);
            return `${match} (${ordinal})`;
        }
    );

    // --- Street number (№ 43)
    formatted = formatted.replace(
        /№\s*([0-9]+)/g,
        (_, numStr) => {
            const num = Number(numStr);
            const words = formatCardinal(num);
            return `№ ${num} (${words})`;
        }
    );

    // --- Floor
    formatted = formatted.replace(
        /(ет\.|етаж)\s*([0-9]+)/gi,
        (_, __, numStr) => {
            const num = Number(numStr);
            const ordinal = formatOrdinal(num);
            return `етаж ${num} (${ordinal})`;
        }
    );

    // --- Apartment
    formatted = formatted.replace(
        /(ап\.|апартамент)\s*([0-9]+)/gi,
        (_, __, numStr) => {
            const num = Number(numStr);
            const ordinal = formatOrdinal(num);
            return `апартамент ${num} (${ordinal})`;
        }
    );

    return formatted;
}

// --- helper
function romanToNumber(roman: string): number {
    const map: Record<string, number> = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
        VI: 6,
        VII: 7,
        VIII: 8,
        IX: 9,
        X: 10
    };

    return map[roman] || 0;
}