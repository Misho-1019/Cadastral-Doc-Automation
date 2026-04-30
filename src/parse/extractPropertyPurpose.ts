export function extractPropertyPurpose(text: string): string {
    const startAnchor = "Предназначение на самостоятелния обект:";
    const endAnchor = "Брой нива на обекта:";

    const startIndex = text.indexOf(startAnchor)
    const endIndex = text.indexOf(endAnchor)

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        return '';
    }

    return text.slice(startIndex + startAnchor.length, endIndex).trim();
}