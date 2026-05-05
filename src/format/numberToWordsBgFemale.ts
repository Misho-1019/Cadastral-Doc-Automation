import { numberToWordsBg } from "./numberToWordsBg";


export function numberToWordsBgFemale(num: number): string {
    const base = numberToWordsBg(num);

    if (num % 10 === 1 && num % 100 !== 11) {
        return base.replace(/едно$/, "една");
    }

    if (num % 10 === 2 && num % 100 !== 12) {
        return base.replace(/две$/, "две");
    }

    return base;
}