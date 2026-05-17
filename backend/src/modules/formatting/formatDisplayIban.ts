export function formatDisplayIban(iban: string): string {
    const normalized = iban.replace(/\s+/g, "").toUpperCase();

    if (normalized.length < 4) {
        return normalized;
    }

    return [
        normalized.slice(0, 2),
        normalized.slice(2, 4),
        ...normalized.slice(4).match(/.{1,4}/g) ?? []
    ].join(" ");
}