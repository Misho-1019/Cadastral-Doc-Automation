import { formatPercentageBg } from "./formatPercentageBg"

export function formatAttachedParts(attachedParts: string): string {
    return attachedParts.replace(/(\d+[,.]\d+)\s*%/g, (_, percent) => {
        return formatPercentageBg(percent)
    })
}