export function identifierToWords(identifier: string): string {
    return identifier
        .split('.')
        .join(" точка ");
}