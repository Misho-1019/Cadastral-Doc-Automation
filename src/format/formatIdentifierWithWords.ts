import { numberToWordsBg } from "./numberToWordsBg";

export function formatIdentifierWithWords(identifier: string): string {
    const parts = identifier.split(".");

    const words = parts.map((part) => {
        const num = Number(part);

        if (Number.isNaN(num)) {
            return part;
        }

        return numberToWordsBg(num);
    });

    return `${identifier} (${words.join(", точка, ")})`;
}