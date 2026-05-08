export function numberToWordsBG(num: number): string {
    const ones = [
        '', 'едно', 'две', 'три', 'четири',
        'пет', 'шест', 'седем', 'осем', 'девет'
    ];

    const tens = [
        '', '', 'двадесет', 'тридесет', 'четиридесет',
        'петдесет', 'шестдесет', 'седемдесет', 'осемдесет', 'деветдесет'
    ];

    if (num < 10) return ones[num];

    if (num < 100) {
        const t = Math.floor(num / 10);
        const o = num % 10;

        return o === 0 ? tens[t] : `${tens[t]} и ${ones[o]}`;
    }

    if (num === 100000) return 'сто хиляди';

    return num.toString();
}