import { ParsedCadastralData } from "../../extraction/parseCadastralData";

export function buildLandPropertyDescription(
    data: ParsedCadastralData
): string {
    const buildingsText = buildBuildingsText(data);

    return [
        "- ПОЗЕМЛЕН ИМОТ,",
        `който съгласно Скица на поземлен имот № ${data.sketchNumber}, издадена от АГКК,`,
        `представлява поземлен имот с идентификатор ${data.identifier},`,
        `по кадастралната карта и кадастралните регистри на ${data.cadastralLocation ?? data.address},`,
        `одобрени със Заповед № ${data.approvalOrder},`,
        `последно изменение на кадастралната карта и кадастралните регистри, засягащо поземления имот: ${data.lastChangeDescription},`,
        `с адрес на поземления имот: ${data.address},`,
        `с площ ${data.area},`,
        `трайно предназначение на територията: ${data.territoryPurpose},`,
        `начин на трайно ползване: ${data.permanentUse},`,
        `предишен идентификатор: ${data.previousIdentifier},`,
        `номер по предходен план: ${data.previousPlanNumber}, квартал: ${data.quarter}, парцел: ${data.plot},`,
        `при съседи: ${data.neighbours}${buildingsText}.`
    ]
        .filter(Boolean)
        .join(" ");
}

function buildBuildingsText(data: ParsedCadastralData): string {
    if (!data.buildings || data.buildings.length === 0) {
        return "";
    }

    const buildings = data.buildings
        .map((building, index) => {
            return [
                `${index + 1}. Сграда с идентификатор ${building.identifier}`,
                `със застроена площ ${building.builtArea}`,
                `брой етажи ${building.floors}`,
                `с предназначение: ${building.purpose}`
            ].join(", ");
        })
        .join("; ");

    return `, ведно със следните сгради, построени в имота: ${buildings}`;
}