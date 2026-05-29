export type BuildingInPropertyData = {
    identifier: string;
    builtUpArea: string;
    floors: string;
    purpose: string;
};
export type LandPropertyData = {
    documentNumber?: string;
    issueDate?: string;
    identifier: string;
    address: string;
    area?: string;
    territoryPurpose?: string;
    permanentUsage?: string;
    landCategory?: string;
    previousIdentifier?: string;
    previousPlanNumber?: string;
    quarter?: string;
    parcel?: string;
    landNeighbours?: string[];
    buildingsInProperty?: BuildingInPropertyData[];
};
//# sourceMappingURL=landProperty.types.d.ts.map