export function formatPercentageBg(value: string | number): string {
    const normalized = String(value).replace(/\s+/g, "").replace("%", "").replace(".", ",");

    return `${normalized} %`;
}