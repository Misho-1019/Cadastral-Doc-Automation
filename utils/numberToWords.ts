const teens = [
    'десет', 'единадесет', 'дванадесет', 'тринадесет', 'четиринадесет',
    'петнадесет', 'шестнадесет', 'седемнадесет', 'осемнадесет', 'деветнадесет'
];

const tens = [
    '', '', 'двадесет', 'тридесет', 'четиридесет',
    'петдесет', 'шестдесет', 'седемдесет', 'осемдесет', 'деветдесет'
];

const hundreds = [
    '', 'сто', 'двеста', 'триста', 'четиристотин',
    'петстотин', 'шестстотин', 'седемстотин', 'осемстотин', 'деветстотин'
];

function getOnes(gender: 'm' | 'f' | 'n') {
    return [
        '',
        gender === 'm' ? 'един' : gender === 'f' ? 'една' : 'едно',
        gender === 'm' ? 'два' : 'две',
        'три',
        'четири',
        'пет',
        'шест',
        'седем',
        'осем',
        'девет'
    ];
}

function underThousand(num: number, gender: 'm' | 'f' | 'n' = 'n'): string {
    const ones = getOnes(gender);
    const result: string[] = [];

    const h = Math.floor(num / 100);
    const remainder = num % 100;

    if (h > 0) {
        result.push(hundreds[h]);
    }

    if (remainder >= 10 && remainder < 20) {
        if (h > 0) result.push('и');
        result.push(teens[remainder - 10]);
    } else {
        const t = Math.floor(remainder / 10);
        const o = remainder % 10;

        if (t > 0) {
            result.push(tens[t]);
        }

        if (o > 0) {
            if (t > 0) {
                result.push('и');
            } else if (h > 0) {
                result.push('и');
            }
            result.push(ones[o]);
        }
    }

    return result.join(' ');
}

function addConjunctionForHundreds(text: string): string {
    const parts = text.split(' ');

    if (parts.length >= 2 && hundreds.includes(parts[0])) {
        return `${parts[0]} и ${parts.slice(1).join(' ')}`;
    }

    return text;
}

export function numberToWordsBG(num: number): string {
    if (num === 0) return 'нула';

    // under 1000
    if (num < 1000) {
        return underThousand(num);
    }

    // thousands
    if (num < 1000000) {
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;

        let result = '';

        if (thousands === 1) {
            result = 'хиляда';
        } else {
            const thousandsWords = addConjunctionForHundreds(
                underThousand(thousands, 'f')
            );

            result = `${thousandsWords} хиляди`;
        }

        if (remainder > 0) {
            if (remainder < 100) {
                result += ' и ';
            } else {
                result += ' ';
            }

            result += underThousand(remainder);
        }

        return result;
    }

    // millions
    if (num < 1000000000) {
        const millions = Math.floor(num / 1000000);
        const remainder = num % 1000000;

        let result = '';

        if (millions === 1) {
            result = 'един милион';
        } else {
            result = `${underThousand(millions, 'm')} милиона`;
        }

        if (remainder > 0) {
            if (remainder < 100) {
                result += ' и ';
            } else {
                result += ' ';
            }

            result += numberToWordsBG(remainder);
        }

        return result;
    }

    return num.toString();
}

export function decimalPercentageToWordsBG(value: string | null): string | null {
    if (!value) return null;

    const [wholePart, decimalPart] = value.replace('.', ',').split(',');

    const whole = Number(wholePart);
    const decimal = Number(decimalPart);

    if (Number.isNaN(whole) || Number.isNaN(decimal)) {
        return null;
    }

    return `${numberToWordsBG(whole)} цяло и ${underThousand(decimal, 'f')} стотни върху сто`;
}