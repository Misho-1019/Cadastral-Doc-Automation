import type { LandPropertyData } from "../types/landProperty.types.js";

export function formatLandPropertyDescription(data: LandPropertyData): string {
    return `
Поземлен имот с идентификатор ${data.identifier},
находящ се в ${data.address},
с площ ${data.area},
с трайно предназначение на територията ${data.territoryPurpose},
с начин на трайно ползване ${data.permanentUsage}.
    `.trim();
}