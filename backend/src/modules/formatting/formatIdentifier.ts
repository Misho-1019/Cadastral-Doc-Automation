import { formatCardinal } from "./numberWords.js";

export function formatIdentifier(identifier: string): string {
    if (identifier.includes(",")) {
        return identifier
            .split(",")
            .map(part => formatIdentifier(part.trim()))
            .join(", ");
    }
    
    const parts = identifier.split(".");

    const words = parts.map(part => {
        const num = Number(part);

        if (Number.isNaN(num)) {
            return part;
        }

        return formatCardinal(num);
    });

    const wordsJoined = words.join(", точка, ");

    return `${identifier} (${wordsJoined})`;
}