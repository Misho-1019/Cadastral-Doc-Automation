const units = [
    "",
    "едно",
    "две",
    "три",
    "четири",
    "пет",
    "шест",
    "седем",
    "осем",
    "девет"
];

const teens = [
    "десет",
    "единадесет",
    "дванадесет",
    "тринадесет",
    "четиринадесет",
    "петнадесет",
    "шестнадесет",
    "седемнадесет",
    "осемнадесет",
    "деветнадесет"
];

const tens = [
    "",
    "",
    "двадесет",
    "тридесет",
    "четиридесет",
    "петдесет",
    "шестдесет",
    "седемдесет",
    "осемдесет",
    "деветдесет"
];

const hundreds = [
    "",
    "сто",
    "двеста",
    "триста",
    "четиристотин",
    "петстотин",
    "шестстотин",
    "седемстотин",
    "осемстотин",
    "деветстотин"
];

function numberBelow100ToWords(num: number): string {
    if (num < 10) {
        return units[num]
    }

    if (num < 20) {
        return teens[num - 10];
    }

    const ten = Math.floor(num / 10);
    const unit = num % 10;

    if (unit === 0) {
        return tens[ten];
    }

    return `${tens[ten]} и ${units[unit]}`
}

function numberBelow1000ToWords(num: number): string {
    if (num < 100) {
        return numberBelow100ToWords(num);
    }

    const hundred = Math.floor(num / 100);
    const remainder = num % 100;

    if (remainder === 0) {
        return hundreds[hundred];
    }

    if (remainder < 10 || remainder % 10 === 0 || remainder < 20) {
        return `${hundreds[hundred]} и ${numberBelow100ToWords(remainder)}`;
    }

    return `${hundreds[hundred]} ${numberBelow100ToWords(remainder)}`;
}

export function numberToWordsBg(num: number): string {
    if (num === 0) {
        return "нула";
    }

    if (num < 1000) {
        return numberBelow1000ToWords(num)
    }

    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    let thousandsText = '';

    if (thousands === 1) {
        thousandsText = "хиляда";
    } else if (thousands === 2) {
        thousandsText = "две хиляди";
    } else {
        thousandsText = `${numberBelow1000ToWords(thousands)} хиляди`;
    }

    if (remainder === 0) {
        return thousandsText;
    }

    return `${thousandsText} ${numberBelow1000ToWords(remainder)}`
}