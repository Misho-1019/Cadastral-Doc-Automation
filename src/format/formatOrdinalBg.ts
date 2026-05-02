const ordinals: Record<number, string> = {
    1: "първи",
    2: "втори",
    3: "трети",
    4: "четвърти",
    5: "пети",
    6: "шести",
    7: "седми",
    8: "осми",
    9: "девети",
    10: "десети"
};

export function formatOrdinalBg(num: number): string {
    return ordinals[num] ?? String(num);
}