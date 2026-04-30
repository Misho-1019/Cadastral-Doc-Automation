export function extractPropertyAdress(text: string): string {
    const startAnchor = "Адрес на самостоятелния обект:";
    const endAnchor = "Самостоятелният обект се намира на етаж";

    const startIndex = text.indexOf(startAnchor)
    const endIndex = text.indexOf(endAnchor)

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        return '';
    }

    return text.slice(startIndex + startAnchor.length, endIndex).trim();
}