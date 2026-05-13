export function normalizePdfText(text: string): string {
    return text
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")

        // fix decimals (safe)
        .replace(/(\d+)\.\s+(\d{1,2})(?!\.)/g, "$1.$2")

        // fix identifiers (controlled)
        .replace(/(\d+)\.\s+(?=\d+\.)/g, "$1.")
        .replace(/(\d+)\.\s+(?=\d+$)/g, "$1.")

        // normalize area unit
        .replace(/кв\.\s*м\.?/gi, "кв.м")

        // punctuation (safe only)
        .replace(/\s+([,:;%])/g, "$1")
        .replace(/([,:;%])(?=\S)/g, "$1 ")

        .trim();
}