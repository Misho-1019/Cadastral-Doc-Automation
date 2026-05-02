import { numberToWordsBg } from "./numberToWordsBg";

export function formatIdentifierWithWords(identifier: string): string {
    const parts = identifier.split('.');

    const formattedParts = parts.map(part => {
        const numericValue = Number(part);

        if (Number.isNaN(numericValue)) {
            return part;
        }

        return `${part} (${numberToWordsBg(numericValue)})`
    })

    return formattedParts.join(", точка, ");
}