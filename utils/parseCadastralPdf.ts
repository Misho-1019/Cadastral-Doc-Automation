export function extractPropertyIdentifier(text: string): string | null {
    const match = text.match(/идентификатор\s+([\d.]+)/i);

    return match ? match[1] : null;
}

export function extractPropertyAddress(text: string): string | null {
    const match = text.match(/Адрес на самостоятелния обект:\s*([\s\S]*?)\nСамостоятелният обект се намира/i)

    if (!match) {
        return null
    }

    return match[1].replace(/\s+/g, ' ').trim();
}