const units: Record<number, string> = {
    0: "нула",
    1: "едно",
    2: "две",
    3: "три",
    4: "четири",
    5: "пет",
    6: "шест",
    7: "седем",
    8: "осем",
    9: "девет"
};

const teens: Record<number, string> = {
    10: "десет",
    11: "единадесет",
    12: "дванадесет",
    13: "тринадесет",
    14: "четиринадесет",
    15: "петнадесет",
    16: "шестнадесет",
    17: "седемнадесет",
    18: "осемнадесет",
    19: "деветнадесет"
};

const tens: Record<number, string> = {
    20: "двадесет",
    30: "тридесет",
    40: "четиридесет",
    50: "петдесет",
    60: "шестдесет",
    70: "седемдесет",
    80: "осемдесет",
    90: "деветдесет"
};

const hundreds: Record<number, string> = {
    100: "сто",
    200: "двеста",
    300: "триста",
    400: "четиристотин",
    500: "петстотин",
    600: "шестстотин",
    700: "седемстотин",
    800: "осемстотин",
    900: "деветстотин"
};

export type BulgarianNumberGender = "neutral" | "masculine" | "feminine";

export function formatCardinal(
    value: number,
    gender: BulgarianNumberGender = "neutral"
): string {
    if (!Number.isInteger(value) || value < 0) {
        throw new Error("formatCardinal supports only non-negative integers");
    }

    if (value < 10) {
        return formatUnit(value, gender);
    }

    if (value < 20) {
        return teens[value];
    }

    if (value < 100) {
        return formatTwoDigits(value, gender);
    }

    if (value < 1000) {
        return formatThreeDigits(value, gender);
    }

    if (value < 1000000) {
        return formatThousands(value, gender);
    }

    throw new Error("formatCardinal currently supports numbers below 1,000,000");
}

function formatUnit(value: number, gender: BulgarianNumberGender): string {
    if (value === 1) {
        if (gender === "masculine") {
            return "един";
        }

        if (gender === "feminine") {
            return "една";
        }

        return "едно";
    }

    if (value === 2) {
        if (gender === "masculine") {
            return "два";
        }

        return "две";
    }

    return units[value];
}

function formatTwoDigits(value: number, gender: BulgarianNumberGender): string {
    const ten = Math.floor(value / 10) * 10;
    const unit = value % 10;

    if (unit === 0) {
        return tens[ten];
    }

    return `${tens[ten]} и ${formatUnit(unit, gender)}`;
}

function formatThreeDigits(value: number, gender: BulgarianNumberGender): string {
    const hundred = Math.floor(value / 100) * 100;
    const remainder = value % 100;

    if (remainder === 0) {
        return hundreds[hundred];
    }

    if (remainder < 20 || remainder % 10 === 0) {
        return `${hundreds[hundred]} и ${formatCardinal(remainder, gender)}`;
    }

    return `${hundreds[hundred]} ${formatCardinal(remainder, gender)}`;
}

function formatThousands(value: number, gender: BulgarianNumberGender): string {
    const thousandPart = Math.floor(value / 1000);
    const remainder = value % 1000;

    let thousandText: string;

    if (thousandPart === 1) {
        thousandText = "хиляда";
    } else if (thousandPart === 2) {
        thousandText = "две хиляди";
    } else {
        thousandText = `${formatCardinal(thousandPart)} хиляди`;
    }

    if (remainder === 0) {
        return thousandText;
    }

    if (remainder < 100 || remainder % 100 === 0) {
        return `${thousandText} и ${formatCardinal(remainder, gender)}`;
    }

    return `${thousandText} ${formatCardinal(remainder, gender)}`;
}