export function formatDisplayMoney(value: string): string {
    const normalized = value
        .replace(/\s+/g, "")
        .replace(",", ".");

    const number = Number(normalized);

    if (Number.isNaN(number)) {
        return value;
    }

    const [integerPart, decimalPart] = number
        .toFixed(2)
        .split(".");

    const formattedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        " "
    );

    if (decimalPart === "00") {
        return formattedInteger;
    }

    return `${formattedInteger},${decimalPart}`;
}