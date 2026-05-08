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