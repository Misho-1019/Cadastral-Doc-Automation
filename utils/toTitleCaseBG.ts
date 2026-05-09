export function toTitleCaseBG(value: string): string {
    return value.replace(/-/g, "–").toLowerCase().split(' ').map(word => {
        if (word === "–") {
            return word;
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ')
}