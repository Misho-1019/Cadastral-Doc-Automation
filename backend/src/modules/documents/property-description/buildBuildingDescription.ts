import { ParsedCadastralData } from "../../extraction/parseCadastralData.js";
import { formatArea } from "../../formatting/formatArea.js";
import { formatCardinal } from "../../formatting/numberWords.js";
import { formatIdentifier } from "../../formatting/formatIdentifier.js";

export function buildBuildingDescription(data: ParsedCadastralData): string {
    return [
        "СГРАДА,",
        `която съгласно Скица на сграда № ${data.sketchNumber}, издадена от АГКК,`,
        `представлява Сграда с идентификатор ${formatIdentifier(data.identifier ?? "")},`,
        `по кадастралната карта и кадастралните регистри на ${data.cadastralLocation ?? data.address},`,
        `одобрени със Заповед № ${data.approvalOrder},`,
        `последно изменение на кадастралната карта и кадастралните регистри, засягащо сградата: ${data.lastChangeDescription},`,
        `с адрес на сградата: ${data.address},`,
        `сградата е разположена в поземлен имот с идентификатор ${formatIdentifier(data.landPropertyIdentifier ?? "")},`,
        `със застроена площ ${formatArea(data.area ?? "")},`,
        `брой етажи: ${formatMasculineNumber(data.buildingFloors)},`,
        `брой самостоятелни обекти в сградата: ${data.independentObjectsCount},`,
        `с предназначение: ${data.purpose},`,
        `стар идентификатор: ${data.oldIdentifier},`,
        `номер по предходен план: ${data.previousPlanNumber}.`
    ]
        .filter(Boolean)
        .join(" ");
}

function formatMasculineNumber(value: string | null | undefined): string {
    if (!value) {
        return "";
    }

    const numberValue = Number(value);

    if (!Number.isInteger(numberValue)) {
        return value;
    }

    return `${value} (${formatCardinal(numberValue, "masculine")})`;
}