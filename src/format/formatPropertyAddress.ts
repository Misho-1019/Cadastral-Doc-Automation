export function formatPropertyAddress(address: string): string {
    return address.replace(/№\s*/g, "№ ").replace(/\s+/g, " ").trim();
}