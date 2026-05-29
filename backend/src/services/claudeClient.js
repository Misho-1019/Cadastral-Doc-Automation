import Anthropic from "@anthropic-ai/sdk";
if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not defined in the environment variables.");
}
export const claude = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
//# sourceMappingURL=claudeClient.js.map