import { buildLegalDescriptionPrompt } from "../prompts/legalDescriptionPrompt.js";
import type { CadastralExtractedData } from "../types/cadastral.types.js";
import { claude } from "./claudeClient.js";

export async function generateAiDescription(
    documentType: string,
    extractedData: CadastralExtractedData
): Promise<string> {
    const response = await claude.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [
            {
                role: 'user',
                content: buildLegalDescriptionPrompt(documentType, extractedData),
            },
        ]
    })

    const textResponse = response.content[0];

    if (textResponse?.type !== 'text') {
        throw new Error("Claude did not return text");
    }

    return textResponse.text.trim();
}