import type { LandPropertyData } from "../types/landProperty.types.js";

export function formatLandPropertyDescription(data: LandPropertyData): string {
    const neighbours = data.landNeighbours?.length
        ? data.landNeighbours.join(', ')
        : 'няма данни';

    const buildings = data.buildingsInProperty?.length
        ? data.buildingsInProperty
            .map((building) => {
                return `сграда с идентификатор ${building.identifier}, със застроена площ ${building.builtUpArea}, брой етажи ${building.floors}, с предназначение: ${building.purpose}`
            }).join('; ')
        : 'няма данни за сгради';

    return `
Поземлен имот с идентификатор ${data.identifier}, находящ се в ${data.address}, с площ ${data.area}, с трайно предназначение на територията: ${data.territoryPurpose}, с начин на трайно ползване: ${data.permanentUsage}, при предходен идентификатор: ${data.previousIdentifier}, номер по предходен план: ${data.previousPlanNumber}, квартал: ${data.quarter}, парцел: ${data.parcel}, при съседи: ${neighbours}, ведно с построените в имота: ${buildings}.
    `.trim();
}