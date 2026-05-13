import { DocumentType } from "./detectDocumentType";

export type BasicCadastralData = {
    documentType: DocumentType;
    identifier: string | null;
    address: string | null;
    area: string | null;
}

function matchFirst(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
        const match = text.match(pattern);

        if (match?.[1]) {
            return match[1].trim();
        }
    }

    return null;
}

export function parseBasicCadastralData(text: string, documentType: DocumentType): BasicCadastralData {
    const identifier = matchFirst(text, [
        /Идентификатор\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)+)/i,
        /самостоятел[еe]н обект.*?([0-9]+(?:\.[0-9]+)+)/i,
        /поземлен имот.*?([0-9]+(?:\.[0-9]+)+)/i,
        /сграда.*?([0-9]+(?:\.[0-9]+)+)/i
    ]);

    const address = matchFirst(text, [
        /Адрес\s*(?:на имота|на сградата|на самостоятелния обект)?\s*[:\-]?\s*([^\n]+)/i,
        /Адрес\s*[:\-]?\s*([^\n]+)/i
    ]);

    const area = matchFirst(text, [
        /Площ\s*(?:на самостоятелния обект|на имота|на сградата)?\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i,
        /Застроена площ\s*[:\-]?\s*([0-9]+(?:[.,][0-9]+)?\s*кв\.?\s*м\.?)/i
    ]);

    return {
        documentType,
        identifier,
        address,
        area,
    }
}