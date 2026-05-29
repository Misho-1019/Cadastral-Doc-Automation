import { claude } from "./claudeClient.js";

export async function extractCadastralData(text: string) {
    const response = await claude.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [
            {
                role: 'user',
                content: `You are extracting data from Bulgarian cadastral documents.

Return ONLY valid JSON.

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

    return response.content;
}