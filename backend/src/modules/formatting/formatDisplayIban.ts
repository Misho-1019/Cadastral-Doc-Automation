export function formatDisplayIban(iban: string): string {
    const normalized = iban
        .replace(/\s+/g, "")
        .toUpperCase();

    return normalized.match(/.{1,4}/g)?.join(" ") || iban;
}