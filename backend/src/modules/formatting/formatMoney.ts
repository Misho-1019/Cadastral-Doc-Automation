import { formatCardinal } from "./numberWords.js";

export function formatMoney(value: string, currency = "евро"): string {
    const normalized = value
        .replace(/\s+/g, "")
        .replace(",", ".");

    const match = normalized.match(/^([0-9]+)(?:\.([0-9]{1,2}))?$/);

    if (!match) {
        return value;
    }

    const whole = Number(match[1]);
    const cents = match[2] ? Number(match[2].padEnd(2, "0")) : 0;

    let words = `${formatCardinal(whole)} ${currency}`;

    if (cents > 0) {
        words += ` и ${formatCardinal(cents)} евроцента`;
    }

    return `${value} ${currency} (${words})`;
}