import { BasicCadastralData } from "../../extraction/parseCadastralData.js";
import { formatIdentifier } from "../../formatting/formatIdentifier.js";
import { formatArea } from "../../formatting/formatArea.js";
import { formatOrdinal } from "../../formatting/formatOrdinal.js";
import { formatCardinal } from "../../formatting/numberWords.js";
import { formatFreeTextNumbers } from "../../formatting/formatFreeTextNumbers.js";
import { formatAddress } from "../../formatting/formatAddress.js";

function formatPurposeTitle(purpose: string): string {
    return purpose
        .replace("Жилище, апартамент", "ЖИЛИЩЕ, АПАРТАМЕНТ")
        .replace(/ - /g, " – ");
}

export function buildIndependentObjectDescription(
    data: BasicCadastralData
): string {
    const parts: string[] = [];

    if (data.purpose && data.identifier) {
        const schemePart = data.schemeNumber
            ? ` № ${data.schemeNumber}`
            : "";

        parts.push(
            `${formatPurposeTitle(data.purpose)}, който съгласно Схема на самостоятелен обект в сграда${schemePart}, издадена от АГКК, представлява Самостоятелен обект в сграда с идентификатор ${formatIdentifier(data.identifier)}`
        );
    }

    if (data.approvalOrder) {
        parts.push(
            data.cadastralLocation
                ? `по кадастралната карта и кадастралните регистри на ${data.cadastralLocation}, одобрени със Заповед № ${data.approvalOrder}`
                : `по кадастралната карта и кадастралните регистри, одобрени със Заповед № ${data.approvalOrder}`
        );
    }

    if (data.lastChangeDescription) {
        parts.push(
            `последно изменение на кадастралната карта и кадастралните регистри, засягащо самостоятелния обект: ${data.lastChangeDescription}`
        );
    }

    if (data.address) {
        parts.push(
            `с адрес на самостоятелния обект: ${formatAddress(data.address)}`
        );
    }

    if (data.objectFloor) {
        let floorText =
            `самостоятелният обект се намира на етаж ${data.objectFloor} (${formatOrdinal(Number(data.objectFloor))})`;

        if (data.buildingIdentifier) {
            floorText += ` в сграда с идентификатор ${formatIdentifier(data.buildingIdentifier)}`;
        }

        parts.push(floorText);
    }

    if (data.buildingFloors) {
        parts.push(
            `с предназначение: Жилищна сграда – многофамилна, брой етажи – ${data.buildingFloors} (${formatCardinal(Number(data.buildingFloors))})`
        );
    }

    if (data.landPropertyIdentifier) {
        parts.push(
            `сградата е разположена в поземлен имот с идентификатор ${formatIdentifier(data.landPropertyIdentifier)}`
        );
    }

    if (data.purpose) {
        parts.push(
            `с предназначение на самостоятелния обект – ${data.purpose}`
        );
    }

    if (data.levelsCount) {
        parts.push(
            `брой нива на обекта: ${data.levelsCount} (${formatCardinal(Number(data.levelsCount))})`
        );
    }

    if (data.area) {
        parts.push(
            `площ на самостоятелния обект – ${formatArea(data.area)}`
        );
    }

    if (data.adjoiningParts) {
        parts.push(`и прилежащи части: ${formatFreeTextNumbers(data.adjoiningParts)}`);
    }

    if (data.levelsCount) {
        parts.push(
            `ниво: ${data.levelsCount} (${formatCardinal(Number(data.levelsCount))})`
        );
    }

    if (
        data.neighbouringObjects?.sameFloor ||
        data.neighbouringObjects?.below ||
        data.neighbouringObjects?.above
    ) {
        const neighbourParts: string[] = [];

        if (data.neighbouringObjects.sameFloor) {
            neighbourParts.push(
                `на същия етаж – ${buildNeighbourIdentifiers(data.neighbouringObjects.sameFloor)}`
            );
        }

        if (data.neighbouringObjects.below) {
            neighbourParts.push(
                `под обекта – самостоятелен обект с идентификатор ${formatIdentifier(data.neighbouringObjects.below)}`
            );
        }

        if (data.neighbouringObjects.above) {
            neighbourParts.push(
                `над обекта – самостоятелен обект с идентификатор ${formatIdentifier(data.neighbouringObjects.above)}`
            );
        }

        parts.push(
            `при съседи на самостоятелния обект: ${neighbourParts.join(", ")}`
        );
    }

    return parts.join(", ");
}

function buildNeighbourIdentifiers(text: string): string {
    return text
        .split(",")
        .map(identifier => identifier.trim())
        .filter(Boolean)
        .map(identifier => {
            return `самостоятелен обект с идентификатор ${formatIdentifier(identifier)}`;
        })
        .join(", ");
}