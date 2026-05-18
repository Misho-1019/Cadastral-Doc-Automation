const romanMap: Record<string, number> = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XI: 11,
    XII: 12,
    XIII: 13,
    XIV: 14,
    XV: 15,
    XVI: 16,
    XVII: 17,
    XVIII: 18,
    XIX: 19,
    XX: 20
};

const ordinalMap: Record<number, string> = {
    1: "първи",
    2: "втори",
    3: "трети",
    4: "четвърти",
    5: "пети",
    6: "шести",
    7: "седми",
    8: "осми",
    9: "девети",
    10: "десети",
    11: "единадесети",
    12: "дванадесети",
    13: "тринадесети",
    14: "четиринадесети",
    15: "петнадесети",
    16: "шестнадесети",
    17: "седемнадесети",
    18: "осемнадесети",
    19: "деветнадесети",
    20: "двадесети"
};

export function formatRomanNumeral(value: string): string {
    const normalized = value.trim().toUpperCase();

    const number = romanMap[normalized];

    if (!number) {
        return value;
    }

    return `${value} (${ordinalMap[number]})`;
}