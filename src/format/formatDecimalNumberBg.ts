import { numberToWordsBg } from "./numberToWordsBg";

export function formatDecimalNumberBg(value: string): string {
    const normalizedValue = value.replace(',', '.');
    const [wholePartRaw, decimalPartRaw] = normalizedValue.split(".");

    const wholePart = Number(wholePartRaw);
    const decimalPart = Number(decimalPartRaw);

    if (Number.isNaN(wholePart) || !decimalPartRaw || Number.isNaN(decimalPart)) {
        return numberToWordsBg(Number(value))
    }

    const decimalDigitsCount = decimalPartRaw.length;

    let decimalUnit = "десети";

    if (decimalDigitsCount === 2) {
        decimalUnit = "стотни";
    }

    if (decimalDigitsCount === 3) {
        decimalUnit = "хилядни";
    }

    return `${numberToWordsBg(wholePart)} цяло и ${numberToWordsBg(decimalPart)} ${decimalUnit}`;
}