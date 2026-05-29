import type { CadastralExtractedData } from "../types/cadastral.types.js";
import { claude } from "./claudeClient.js";

export async function extractCadastralData(text: string): Promise<CadastralExtractedData> {
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `You are extracting data from Bulgarian cadastral documents.

Return ONLY raw valid JSON.
Do not use markdown.
Do not wrap the JSON in code fences.
Do not add explanations.
Important:

- documentNumber must contain ONLY the document number.
- Do not include the date in documentNumber.
- issueDate must contain ONLY the date.
- Example:
  documentNumber: "15-212416"
  issueDate: "12.02.2026"

Important:

approvalOrder must contain ONLY the order number.

Correct:
approvalOrder: "РД-18-33"

Incorrect:
approvalOrder: "РД-18-33/15.06.2010 г."

approvalOrderDate must contain ONLY the date.

Use this exact JSON shape:

{
  "documentType": "",
  "documentNumber": "",
  "issueDate": "",
  "identifier": "",
  "address": "",
  "area": "",
  "purpose": "",
  "landIdentifier": "",
  "floors": "",
  "levels": "",
  "previousIdentifier": "",
  "neighbours": [],
  "additionalInfo": "",
  "floor": "",
  "buildingIdentifier": "",
  "buildingPurpose": "",
  "buildingFloors": "",
  "objectPurpose": "",
  "adjoiningParts": "",
  "sameFloorNeighbours": [],
  "belowNeighbour": "",
  "aboveNeighbour": ""
  "territoryPurpose": "",
  "permanentUsage": "",
  "landCategory": "",
  "previousPlanNumber": "",
  "quarter": "",
  "parcel": "",
  "landNeighbours": [],
  "buildingsInProperty": [
    {
      "identifier": "",
      "builtUpArea": "",
      "floors": "",
      "purpose": ""
    }
  ],
  "builtUpArea": "",
  "independentObjectsCount": "",
  "oldIdentifier": "",
  "previousPlanNumberForBuilding": ""
  "cadastralLocation": "",
  "approvalOrder": "",
  "approvalOrderDate": "",
  "lastChangeDescription": ""
}

Document:

${text}`,
      }
    ]
  })

  const textResponse = response.content[0];

  if (textResponse?.type !== 'text') {
    throw new Error('Claude did not return text');
  }

  try {
    const cleanedResponse = textResponse.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse Claude response:", textResponse.text);

    throw new Error("Failed to parse AI extraction response");
  }
}