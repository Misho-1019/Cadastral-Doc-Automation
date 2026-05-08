const ordinalWords: Record<number, string> = {
    1: 'първи',
    2: 'втори',
    3: 'трети',
    4: 'четвърти',
    5: 'пети',
    6: 'шести',
    7: 'седми',
    8: 'осми',
    9: 'девети',
    10: 'десети',
    11: 'единадесети',
    12: 'дванадесети',
    13: 'тринадесети',
    14: 'четиринадесети',
    15: 'петнадесети',
    16: 'шестнадесети',
    17: 'седемнадесети',
    18: 'осемнадесети',
    19: 'деветнадесети',
    20: 'двадесети'
};

export function ordinalToWordsBG(value: string | number | null): string | null {
    if (value === null) {
        return null;
    }

    const num = Number(value);

    if (!Number.isInteger(num)) {
        return null;
    }

    return ordinalWords[num] ?? null;
}