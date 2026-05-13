import { DocumentType } from "./detectDocumentType";
import { extractAdjoiningParts } from "./extractAdjoiningParts";
import { extractArea } from "./extractArea";
import { extractIdentifier } from "./extractIdentifier";
import { extractIndependentObjectDetails } from "./extractIndependentObjectDetails";
import { extractNeighbouringObjects } from "./extractNeighbouringObjects";
import { extractOwners, Owner } from "./extractOwners";
import { extractRelatedIdentifiers } from "./extractRelatedIdentifiers";

export type BasicCadastralData = {
    documentType: DocumentType;
    identifier: string | null;
    address: string | null;
    area: string | null;
    adjoiningParts: string | null;
    objectFloor: string | null;
    buildingFloors: string | null;
    levelsCount: string | null;
    purpose: string | null;
    buildingIdentifier: string | null;
    landPropertyIdentifier: string | null;
    neighbouringObjects: {
        sameFloor: string | null;
        below: string | null;
        above: string | null;
    };
    owners: Owner[];
}

function matchFirst(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
        const match = text.match(pattern);

        if (match?.[1]) {
            return match[1].trim();
        }
    }

    return null;
}

function extractBlockBetween(
    text: string,
    startPattern: RegExp,
    endPatterns: RegExp[]
): string | null {
    const startMatch = startPattern.exec(text);

    if (!startMatch || startMatch.index === undefined) {
        return null;
    }

    const startIndex = startMatch.index + startMatch[0].length;
    const restText = text.slice(startIndex);

    let endIndex = restText.length;

    for (const endPattern of endPatterns) {
        const endMatch = endPattern.exec(restText);

        if (endMatch && endMatch.index < endIndex) {
            endIndex = endMatch.index;
        }
    }

    return restText
        .slice(0, endIndex)
        .replace(/\s*\n\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function parseBasicCadastralData(text: string, documentType: DocumentType): BasicCadastralData {
    const identifier = extractIdentifier(text);

    const address = extractBlockBetween(
        text,
        /Адрес\s*(?:на имота|на сградата|на самостоятелния обект)?\s*[:\-]?\s*/i,
        [
            /Самостоятелният обект се намира/i,
            /Сградата е разположена/i,
            /Поземленият имот/i,
            /Площ/i,
            /Предназначение/i
        ]
    );

    const area = extractArea(text);

    const adjoiningParts = documentType === 'independentObjectScheme' ? extractAdjoiningParts(text) : null;

    const independentObjectDetails = documentType === 'independentObjectScheme' ? extractIndependentObjectDetails(text) : { objectFloor: null, buildingFloors: null, levelsCount: null, purpose: null };

    const relatedIdentifiers = documentType === 'independentObjectScheme' ? extractRelatedIdentifiers(text) : { buildingIdentifier: null, landPropertyIdentifier: null };

    const neighbouringObjects = documentType === 'independentObjectScheme' ? extractNeighbouringObjects(text) : { sameFloor: null, below: null, above: null };

    const owners = extractOwners(text);

    return {
        documentType,
        identifier,
        address,
        area,
        adjoiningParts,
        objectFloor: independentObjectDetails.objectFloor,
        buildingFloors: independentObjectDetails.buildingFloors,
        levelsCount: independentObjectDetails.levelsCount,
        purpose: independentObjectDetails.purpose,
        buildingIdentifier: relatedIdentifiers.buildingIdentifier,
        landPropertyIdentifier: relatedIdentifiers.landPropertyIdentifier,
        neighbouringObjects,
        owners,
    }
}