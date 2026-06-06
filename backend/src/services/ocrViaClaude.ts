import { claude } from "./claudeClient.js";

export async function ocrViaClaude(pdfBuffer: Buffer): Promise<string> {
  const pdfBase64 = pdfBuffer.toString("base64");

  const response = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdfBase64,
            },
          },
          {
            type: "text",
            text: "Extract ALL text from this Bulgarian cadastral document. Preserve the original Bulgarian Cyrillic text exactly as it appears. Return ONLY the extracted text, no explanations.",
          },
        ],
      },
    ],
  });

  const textResponse = response.content[0];

  if (textResponse?.type !== "text") {
    throw new Error("Claude OCR did not return text");
  }

  return textResponse.text.trim();
}
