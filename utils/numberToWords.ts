const ones = [
    '', 'едно', 'две', 'три', 'четири',
    'пет', 'шест', 'седем', 'осем', 'девет'
];

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

function underThousand(num: number): string {
    let result: string[] = [];

    const h = Math.floor(num / 100);
    const remainder = num % 100;

    if (h > 0) {
        result.push(hundreds[h]);
    }

    if (remainder >= 10 && remainder < 20) {
        result.push(teens[remainder - 10]);
    } else {
        const t = Math.floor(remainder / 10);
        const o = remainder % 10;

        if (t > 0) {
            if (h > 0) {
                result.push('и');
            }

            result.push(tens[t]);
        }

        if (o > 0) {
            if (t > 0) {
                result.push('и');
            }
            result.push(ones[o]);
        }
    }

    return result.join(' ');
}

export function numberToWordsBG(num: number): string {
    if (num === 0) return 'нула';

    if (num < 1000) {
        return underThousand(num);
    }

    if (num < 1000000) {
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;

        let result = '';

        if (thousands === 1) {
            result = 'хиляда';
        } else {
            result = `${underThousand(thousands)} хиляди`;
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

    return num.toString(); // fallback for now
}