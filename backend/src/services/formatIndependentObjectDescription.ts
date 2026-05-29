import type { IndependentObjectData } from "../types/independentObject.types.js";

function formatDocumentReference(
    documentNumber?: string,
    issueDate?: string
): string {
    if (!documentNumber && !issueDate) {
        return "";
    }

    if (documentNumber && issueDate) {
        return `${documentNumber}-${issueDate}`;
    }

    return documentNumber || issueDate || "";
}

export function formatIndependentObjectDescription(data: IndependentObjectData): string {
    const documentReference = formatDocumentReference(
        data.documentNumber,
        data.issueDate
    );

    return `
${data.objectPurpose}, който съгласно Схема на самостоятелен обект в сграда № ${documentReference} г., издадена от АГКК, представлява Самостоятелен обект в сграда с идентификатор ${data.identifier}, по кадастралната карта и кадастралните регистри на ${data.cadastralLocation}, одобрени със Заповед № ${data.approvalOrder} от ${data.approvalOrderDate} г. на Изпълнителния директор на АГКК, последно изменение на кадастралната карта и кадастралните регистри, засягащо самостоятелния обект: ${data.lastChangeDescription}, с адрес на самостоятелния обект: ${data.address}, самостоятелният обект се намира на етаж ${data.floor} в сграда с идентификатор ${data.buildingIdentifier}, с предназначение: ${data.buildingPurpose}, брой етажи: ${data.buildingFloors}, сградата е разположена в поземлен имот с идентификатор ${data.landIdentifier}, с предназначение на самостоятелния обект: ${data.objectPurpose}, брой нива на обекта: ${data.levels}, площ на самостоятелния обект: ${data.area}, прилежащи части: ${data.adjoiningParts}, при съседи на самостоятелния обект: на същия етаж - ${data.sameFloorNeighbours?.join(", ")}, под обекта - ${data.belowNeighbour}, над обекта - ${data.aboveNeighbour}, предишен идентификатор: ${data.previousIdentifier}.
    `
        .replace(/\s+/g, " ")
        .trim();
}