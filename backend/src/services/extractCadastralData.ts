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

Use this exact JSON shape:

{
  "documentType": "",
  "identifier": "",
  "address": "",
  "area": "",
  "purpose": ""
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

    return JSON.parse(textResponse.text);
}