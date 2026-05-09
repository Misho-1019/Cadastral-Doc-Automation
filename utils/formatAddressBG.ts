import { numberToWordsBG } from "./numberToWords.js";

function romanToNumber(roman: string): number {
    const map: Record<string, number> = {
        I: 1, V: 5, X: 10, L: 50, C: 100
    };

    let result = 0;
    let prev = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const curr = map[roman[i]] || 0;
        if (curr < prev) result -= curr;
        else result += curr;
        prev = curr;
    }

    return result;
}

function ordinalBG(num: number): string {
    const map: Record<number, string> = {
        1: "първи",
        2: "втори",
        3: "трети",
        4: "четвърти",
        5: "пети",
        6: "шести",
        7: "седми",
        8: "осми",
        9: "девети",
        10: "десети"
    };

    return map[num] || numberToWordsBG(num);
}

export function formatAddressBG(address: string): string {
    let result = address;

    // Fix casing for street name
    result = result.replace(/ул\.\s+([^№,]+)/, (_, name) => {
        const fixed = name
            .trim()
            .toLowerCase()
            .split(" ")
            .map((word: string) => {
                const upperWord = word.toUpperCase();

                if (/^[IVXLCDM]+$/i.test(word)) {
                    return upperWord;
                }

                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");

        return `ул. ${fixed} `;
    });

    // Roman numeral in street name (II → втори)
    result = result.replace(/\b([IVX]+)\b/, (match) => {
        const num = romanToNumber(match);
        return `${match} (${ordinalBG(num)})`;
    });

    // Street number
    result = result.replace(/№\s?(\d+)/, (_, num) => {
        return `№ ${num} (${numberToWordsBG(Number(num))})`;
    });

    // Floor
    result = result.replace(/ет\.\s?(\d+)/, (_, num) => {
        return `етаж ${num} (${ordinalBG(Number(num))})`;
    });

    // Apartment
    result = result.replace(/ап\.\s?(\d+)/, (_, num) => {
        return `апартамент ${num} (${ordinalBG(Number(num))})`;
    });

    return result;
}