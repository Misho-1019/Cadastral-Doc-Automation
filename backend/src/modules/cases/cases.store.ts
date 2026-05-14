import { BasicCadastralData } from "../extraction/parseCadastralData.js";
import { ValidationResult } from "../extraction/validateCadastralData.js";

export type ManualCaseData = {
    seller: Record<string, unknown>;
    buyer: Record<string, unknown>;
    transaction: Record<string, unknown>;
    notary: Record<string, unknown>;
    ownershipDocument: Record<string, unknown>;
    taxEvaluation: Record<string, unknown>;
    bankDetails: Record<string, unknown>;
};

export type CaseRecord = {
    id: string;
    fileName: string;
    documentType: string;
    extractedData: BasicCadastralData;
    validation: ValidationResult;
    propertyDescription: string;
    createdAt: string;
    manualData: ManualCaseData | null;
};

const cases = new Map<string, CaseRecord>();

export function createCase(input: Omit<CaseRecord, "id" | "createdAt">): CaseRecord {
    const id = crypto.randomUUID();

    const caseRecord: CaseRecord = {
        id,
        ...input,
        createdAt: new Date().toISOString(),
    };

    cases.set(id, caseRecord);

    return caseRecord;
}

export function getCaseById(id: string): CaseRecord | null {
    return cases.get(id) ?? null;
}

export function updateCaseManualData(
    id: string,
    manualData: ManualCaseData
): CaseRecord | null {
    const caseRecord = cases.get(id);

    if (!caseRecord) {
        return null;
    }

    const updatedCase: CaseRecord = {
        ...caseRecord,
        manualData
    };

    cases.set(id, updatedCase);

    return updatedCase;
}