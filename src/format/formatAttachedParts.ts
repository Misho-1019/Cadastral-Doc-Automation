import { formatDecimalNumberBg } from "./formatDecimalNumberBg";
import { formatPercentageBg } from "./formatPercentageBg"
import { numberToWordsBg } from "./numberToWordsBg";

function formatNumberWithWords(numStr: string): string {
    const num = Number(numStr);

    if (Number.isNaN(num)) {
        return numStr;
    }

    return `${numStr} (${numberToWordsBg(num)})`;
}

export function formatAttachedParts(text: string): string {
    if (!text) {
        return text;
    }

    let result = text.replace(/таван (\d+)/g, (_, n) => {
        return `таван ${formatNumberWithWords(n)}`;
    });

    result = result.replace(/изба (\d+)/g, (_, n) => {
        return `изба ${formatNumberWithWords(n)}`;
    });

    result = result.replace(/(\d+,\d+)\s*%/g, (_, n) => {
        return `${n} % (${formatDecimalNumberBg(n)} върху сто)`;
    });

    result = result.replace(/ид\.ч\./g, "идеални части ");

    return result;
}