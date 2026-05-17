import { BasicCadastralData } from "../../extraction/parseCadastralData.js";
import { formatIdentifier } from "../../formatting/formatIdentifier.js";
import { formatArea } from "../../formatting/formatArea.js";
import { formatOrdinal } from "../../formatting/formatOrdinal.js";
import { formatCardinal } from "../../formatting/numberWords.js";
import { formatFreeTextNumbers } from "../../formatting/formatFreeTextNumbers.js";
import { formatAddress } from "../../formatting/formatAddress.js";

export function buildIndependentObjectDescription(
    data: BasicCadastralData
): string {
    const parts: string[] = [];

    if (data.identifier) {
        parts.push(`самостоятелен обект в сграда с идентификатор ${formatIdentifier(data.identifier)}`);
    }

    if (data.address) {
        parts.push(`с адрес: ${formatAddress(data.address)}`);
    }

    if (data.objectFloor) {
        parts.push(`разположен на етаж ${data.objectFloor} (${formatOrdinal(Number(data.objectFloor))})`);
    }

    if (data.buildingIdentifier) {
        parts.push(`в сграда с идентификатор ${formatIdentifier(data.buildingIdentifier)}`);
    }

    if (data.buildingFloors) {
        parts.push(`с брой етажи ${data.buildingFloors} (${formatCardinal(Number(data.buildingFloors))})`);
    }

    if (data.landPropertyIdentifier) {
        parts.push(`разположена в поземлен имот с идентификатор ${formatIdentifier(data.landPropertyIdentifier)}`);
    }

    if (data.purpose) {
        parts.push(`с предназначение: ${data.purpose}`);
    }

    if (data.levelsCount) {
        parts.push(`брой нива на обекта: ${data.levelsCount} (${formatCardinal(Number(data.levelsCount))})`);
    }

    if (data.area) {
        parts.push(`с площ ${formatArea(data.area)}`);
    }

    if (data.adjoiningParts) {
        parts.push(`заедно с прилежащи части: ${formatFreeTextNumbers(data.adjoiningParts)}`);
    }

    return parts.join(", ");
}