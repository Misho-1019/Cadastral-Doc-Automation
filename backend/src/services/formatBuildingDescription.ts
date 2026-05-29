import type { BuildingData } from "../types/building.types.js";

export function formatBuildingDescription(data: BuildingData): string {
    return `
Сграда с идентификатор ${data.identifier}, находяща се в ${data.address}, построена в поземлен имот с идентификатор ${data.landIdentifier}, със застроена площ ${data.builtUpArea}, брой етажи: ${data.floors}, с предназначение: ${data.purpose}, при предходен идентификатор: ${data.oldIdentifier}, номер по предходен план: ${data.previousPlanNumberForBuilding}.
    `.trim();
}