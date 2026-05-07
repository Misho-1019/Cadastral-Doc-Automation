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

export function extractPropertyArea(text: string): string | null {
    const match = text.match(/Площ на самостоятелния обект:\s*([\d.,]+)\s*кв\.м/i)

    return match ? match[1] : null;
}

export function extractOwnerName(text: string): string | null {
    const match = text.match(/Собственици по данни от КРНИ:\s*([\s\S]*?)\n/)

    if (!match) {
        return null;
    }

    return match[1].replace(/\s+/g, ' ').trim();
}

export function extractPropertyFloor(text: string): string | null {
    const address = extractPropertyAddress(text);

    if (!address) {
        return null;
    }

    const match = address.match(/ет\.\s*(\d+)/i);

    return match ? match[1] : null;
}

export function extractApartmentNumber(text: string): string | null {
    const address = extractPropertyAddress(text);

    if (!address) {
        return null;
    }

    const match = address.match(/ап\.\s*(\d+)/i);

    return match ? match[1] : null;
}

export function extractBuildingIdentifier(text: string): string | null {
    const match = text.match(/сграда с идентификатор\s+([\d.]+)/i);

    return match ? match[1] : null;
}

export function extractParcelIdentifier(text: string): string | null {
    const match = text.match(/поземлен имот с идентификатор\s+([\d.]+)/i);

    return match ? match[1] : null;
}

export function extractAtticNumber(text: string): string | null {
    const match = text.match(/таван\s*(\d+)/i);

    return match ? match[1] : null;
}

export function extractBasementNumber(text: string): string | null {
    const match = text.match(/изба\s*(\d+)/i);

    return match ? match[1] : null;
}

export function extractCommonPartsPercentage(text: string): string | null {
    const match = text.match(/([\d.,]+)\s*%\s*ид\.ч/i);

    return match ? match[1] : null;
}