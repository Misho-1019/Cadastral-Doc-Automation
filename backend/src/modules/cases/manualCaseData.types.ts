export type PersonData = {
    fullName?: string;
};

export type TransactionData = {
    salePrice?: string;
    depositAmount?: string;
    remainingAmount?: string;
    contractDate?: string;
    preliminaryContractDate?: string;
};

export type TaxEvaluationData = {
    amount?: string;
    number?: string;
    date?: string;
};

export type NotaryData = {
    name?: string;
};

export type BankDetailsData = {
    bic?: string;
    iban?: string;
};

export type OwnershipDocumentData = Record<string, unknown>;

export type ManualCaseData = {
    seller?: PersonData;
    buyer?: PersonData;
    transaction?: TransactionData;
    notary?: NotaryData;
    ownershipDocument?: OwnershipDocumentData;
    taxEvaluation?: TaxEvaluationData;
    bankDetails?: BankDetailsData;
};