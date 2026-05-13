export function normalizePdfText(text: string): string {
    return text
        // join broken lines
        .replace(/\n+/g, " ")

        // remove multiple spaces
        .replace(/\s+/g, " ")

        // restore cadastral identifiers broken by spacing
        .replace(/(\d+)\.\s+(?=\d)/g, "$1.")

        // restore decimal numbers broken by spacing
        .replace(/(\d+)[,.]\s+(?=\d)/g, "$1.")

        // restore common Bulgarian area unit spacing
        .replace(/кв\.\s*м\.?/gi, "кв.м")

        // clean some common punctuation spacing, but do NOT touch dots between numbers
        .replace(/\s+([,:;%])/g, "$1")
        .replace(/([,:;%])(?=\S)/g, "$1 ")

        .trim();
}