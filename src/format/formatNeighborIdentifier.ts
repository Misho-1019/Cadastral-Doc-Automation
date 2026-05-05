import { formatIdentifierWithWords } from "./formatIdentifierWithWords";

export function formatNeighborIdentifier(identifier: string): string {
    if (!identifier) {
        return '';
    }

    return `самостоятелен обект с идентификатор ${formatIdentifierWithWords(identifier)}`;
}