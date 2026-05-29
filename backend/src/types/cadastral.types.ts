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

    floor?: string;

    buildingIdentifier?: string;
    buildingPurpose?: string;
    buildingFloors?: string;

    objectPurpose?: string;

    adjoiningParts?: string;

    sameFloorNeighbours?: string[];
    belowNeighbour?: string;
    aboveNeighbour?: string;
};