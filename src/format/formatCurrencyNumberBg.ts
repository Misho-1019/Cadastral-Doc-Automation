export function formatCurrencyNumberBg(amount: number): string {
    const fixed = amount.toFixed(2);
    const [wholePart, decimalPart] = fixed.split('.');

    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return `${formattedWholePart},${decimalPart}`;
}