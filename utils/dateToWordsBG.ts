import { numberToWordsBG } from "./numberToWords.js";

const months = [
    "януари",
    "февруари",
    "март",
    "април",
    "май",
    "юни",
    "юли",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
];

const dayOrdinals: Record<number, string> = {
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
    20: "двадесети",
    21: "двадесет и първи",
    22: "двадесет и втори",
    23: "двадесет и трети",
    24: "двадесет и четвърти",
    25: "двадесет и пети",
    26: "двадесет и шести",
    27: "двадесет и седми",
    28: "двадесет и осми",
    29: "двадесет и девети",
    30: "тридесети",
    31: "тридесет и първи",
};

function yearToOrdinalBG(year: number): string {
    const words = numberToWordsBG(year)

    const replacements: Record<string, string> = {
        "едно": "първа",
        "две": "втора",
        "три": "трета",
        "четири": "четвърта",
        "пет": "пета",
        "шест": "шеста",
        "седем": "седма",
        "осем": "осма",
        "девет": "девета",
        "десет": "десета",
        "единадесет": "единадесета",
        "дванадесет": "дванадесета",
        "тринадесет": "тринадесета",
        "четиринадесет": "четиринадесета",
        "петнадесет": "петнадесета",
        "шестнадесет": "шестнадесета",
        "седемнадесет": "седемнадесета",
        "осемнадесет": "осемнадесета",
        "деветнадесет": "деветнадесета",
        "двадесет": "двадесета",
        "тридесет": "тридесета",
        "четиридесет": "четиридесета",
        "петдесет": "петдесета",
        "шестдесет": "шестдесета",
        "седемдесет": "седемдесета",
        "осемдесет": "осемдесета",
        "деветдесет": "деветдесета",
    };

    const parts = words.split(' ');
    const last = parts[parts.length - 1];

    const ordinalLast = replacements[last] || last;

    parts[parts.length - 1] = ordinalLast;

    return parts.join(' ');
}

export function dateToWordsBG(value: string): string {
    const [dayRaw, monthRaw, yearRaw] = value.split('.');

    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    const dayWords = dayOrdinals[day];
    const monthWords = months[month - 1];
    const yearWords = yearToOrdinalBG(year);

    if (!dayWords || !monthWords || !yearWords) {
        throw new Error("Invalid date for Bulgarian wording");
    }

    return `${dayWords} ${monthWords} ${yearWords} година`;
}