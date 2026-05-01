import { numberToWordsBg } from "./numberToWordsBg";

export function formatMoneyToWordsBg(amount: number): string {
    const wholePart = Math.floor(amount);
    const centsPart = Math.round((amount - wholePart) * 100);

    const wholeWords = `${numberToWordsBg(wholePart)} евро`;

    if (centsPart === 0) {
        return wholeWords
    }

    const centsWords = `${numberToWordsBg(centsPart)} евроцента`;

    return `${wholeWords} и ${centsWords}`;
}