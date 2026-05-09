export function toTitleCaseBG(value: string): string {
    return value.toLowerCase().split(' ').map(word => {
        if (word === '-' || word === '–') {
            return word;
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ')
}