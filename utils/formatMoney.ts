import { numberToWordsBG } from "./numberToWords.js";

export function formatEuroAmount(value: string | number): string {
    const raw = String(value).replace(/\s/g, '').replace(',', '.');
    const amount = Number(raw);

    if (Number.isNaN(amount)) {
        return String(value);
    }

    return amount.toLocaleString('bg-BG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

export function euroAmountToWordsBG(value: string | number): string {
    const normalized = String(value).replace(/\s/g, "").replace(",", ".");

    const [euroPartRaw, centsPartRaw = '0'] = normalized.split('.');

    const euroPart = Number(euroPartRaw);
    const centsPart = Number(centsPartRaw.padEnd(2, '0').slice(0, 2));

    const euroWords = `${numberToWordsBG(euroPart)} евро`;

    if (centsPart > 0) {
        return `${euroWords} и ${numberToWordsBG(centsPart)} евроцента`;
    }

    return euroWords;
}