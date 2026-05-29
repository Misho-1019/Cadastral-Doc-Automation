export type CadastralExtractedData = {
    documentType: string;
    identifier: string;
    address: string;
    area: string;
    purpose: string;

    documentNumber?: string;
    issueDate?: string;

    landIdentifier?: string;

    floors?: string;
    levels?: string;

    previousIdentifier?: string;

    neighbours?: string[];

    additionalInfo?: string;
};