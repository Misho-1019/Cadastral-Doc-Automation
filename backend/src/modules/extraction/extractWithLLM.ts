import OpenAI from "openai";
import { DocumentType } from "./detectDocumentType.js";
import { ParsedCadastralData } from "./parseCadastralData.js";

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    return openai;
}

const EXTRACTION_PROMPT = `Вие сте асистент за извличане на кадастрални данни от текст на български език.

Задача: От дадения текст, извлечен от кадастрална скица, попълнете JSON обект със следните полета. Използвайте null за липсващи стойности.

ПОЛЕТА ЗА ИЗВЛИЧАНЕ:

1. documentType (string) — тип на документа: "independentObjectScheme" | "landPropertySketch" | "buildingSketch" | "unknown"
2. identifier (string | null) — идентификатор на имота/обекта (напр. 68134.708.258)
3. address (string | null) — адрес
4. area (string | null) — площ (напр. "85.23 кв.м")
5. adjoiningParts (string | null) — прилежащи части (само за самостоятелен обект)
6. objectFloor (string | null) — етаж, на който се намира обектът
7. buildingFloors (string | null) — брой етажи на сградата
8. levelsCount (string | null) — брой нива на обекта
9. purpose (string | null) — предназначение
10. buildingIdentifier (string | null) — идентификатор на сградата
11. landPropertyIdentifier (string | null) — идентификатор на поземления имот
12. neighbouringObjects (object) — съседни обекти: { sameFloor: string|null, below: string|null, above: string|null }
13. owners (array) — масив от { name: string, ownershipDocument: string|null }
14. schemeNumber (string | null) — схема №
15. approvalOrder (string | null) — заповед за одобряване (пълният текст)
16. lastChangeDescription (string | null) — описание на последното изменение
17. cadastralLocation (string | null) — местоположение по кадастралната карта

ЗА ПОЗЕМЛЕН ИМОТ (landPropertySketch):
18. sketchNumber (string | null) — номер на скицата
19. territoryPurpose (string | null) — трайно предназначение на територията
20. permanentUse (string | null) — начин на трайно ползване
21. previousIdentifier (string | null) — предишен идентификатор
22. previousPlanNumber (string | null) — номер по предходен план
23. quarter (string | null) — квартал
24. plot (string | null) — парцел
25. neighbours (string | null) — съседи
26. buildings (array) — сгради в имота: [{ identifier: string, builtArea: string|null, floors: string|null, purpose: string|null }]

ЗА СГРАДА (buildingSketch):
27. sketchNumber (string | null) — номер на скицата
28. cadastralLocation (string | null) — местоположение
29. lastChangeDescription (string | null) — последно изменение (ако не е попълнено по-горе)
30. landPropertyIdentifier (string | null) — идентификатор на поземлен имот (ако не е попълнено по-горе)
31. buildingFloors (string | null) — брой етажи (ако не е попълнено по-горе)
32. purpose (string | null) — предназначение (ако не е попълнено по-горе)
33. independentObjectsCount (string | null) — брой самостоятелни обекти в сградата
34. oldIdentifier (string | null) — стар идентификатор
35. previousPlanNumber (string | null) — номер по предходен план (ако не е попълнено по-горе)

ИЗИСКВАНИЯ:
- Задължително попълнете: documentType, identifier, address, area, owners
- Запазете оригиналния формат на числата и идентификаторите
- Използвайте оригиналния правопис от документа
- При съмнение за липсващо поле, използвайте null
- Върнете САМО валиден JSON без допълнителен текст`;

type LLMExtractionResult = ParsedCadastralData & {
    _warnings?: string[];
};

export async function extractWithLLM(
    text: string,
    documentType: DocumentType
): Promise<LLMExtractionResult> {
    const response = await getOpenAI().chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: EXTRACTION_PROMPT
            },
            {
                role: "user",
                content: `Тип на документа: ${documentType}\n\nТекст от кадастрална скица:\n${text}`
            }
        ],
        response_format: { type: "json_object" },
        temperature: 0,
        max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
        throw new Error("LLM returned empty response");
    }

    const parsed = JSON.parse(content) as LLMExtractionResult;

    parsed.documentType = documentType;

    parsed.approvalOrder = cleanApprovalOrder(parsed.approvalOrder);
    parsed.schemeNumber = cleanSchemeNumber(parsed.schemeNumber);

    parsed.owners = (parsed.owners || []).map(owner => ({
        name: owner.name || "",
        ownershipDocument: owner.ownershipDocument || null
    }));

    return parsed;
}

function cleanApprovalOrder(value: string | null): string | null {
    if (!value) return null;

    return value
        .replace(/\s+/g, " ")
        .replace("/", " от ")
        .replace("ИЗПЪЛНИТЕЛЕН ДИРЕКТОР", "Изпълнителния директор")
        .replace("АГКК", "АГКК")
        .replace("НА АГКК", "на АГКК")
        .trim();
}

function cleanSchemeNumber(value: string | null): string | null {
    if (!value) return null;

    return value.endsWith("г.")
        ? value
        : `${value} г.`;
}
