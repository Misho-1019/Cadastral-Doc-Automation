export function extractAdjoiningParts(text: string): string | null {
    const match = text.match(
        /Прилежащи\s+части\s*:\s*(.*?)(?=\s+Ниво\s*:|\s+Съседни\s+самостоятелни\s+обекти|\s+Предишен\s+идентификатор|\s+Собственици\s+по\s+данни)/i
    );

    if (!match?.[1]) {
        return null;
    }

    return match[1]
        .replace(/\s+/g, " ")
        .trim();
}