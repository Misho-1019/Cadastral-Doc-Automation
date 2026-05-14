import { BasicCadastralData } from "../extraction/parseCadastralData.js";
import { ValidationResult } from "../extraction/validateCadastralData.js";

export type CaseRecord = {
    id: string;
    fileName: string;
    documentType: string;
    extractedData: BasicCadastralData;
    validation: ValidationResult;
    propertyDescription: string;
    createdAt: string;
};

const cases = new Map<string, CaseRecord>();

export function createCase(input: Omit<CaseRecord, "id" | "createdAt">): CaseRecord {
    const id = crypto.randomUUID();

    const caseRecord: CaseRecord = {
        id,
        ...input,
        createdAt: new Date().toISOString()
    };

    cases.set(id, caseRecord);

    return caseRecord;
}

export function getCaseById(id: string): CaseRecord | null {
    return cases.get(id) ?? null;
}