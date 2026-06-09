const ONES = ["", "едно", "две", "три", "четири", "пет", "шест", "седем", "осем", "девет"];
const ONES_FEM = ["", "една", "две", "три", "четири", "пет", "шест", "седем", "осем", "девет"];

const TEENS = [
  "десет", "единадесет", "дванадесет", "тринадесет", "четиринадесет",
  "петнадесет", "шестнадесет", "седемнадесет", "осемнадесет", "деветнадесет",
];

const TENS = ["", "", "двадесет", "тридесет", "четиридесет", "петдесет", "шестдесет", "седемдесет", "осемдесет", "деветдесет"];

const HUNDREDS = ["", "сто", "двеста", "триста", "четиристотин", "петстотин", "шестстотин", "седемстотин", "осемстотин", "деветстотин"];

const HUNDREDS_FEM_ORDINAL = ["", "стотна", "двестотна", "тристотна", "четиристотна", "петстотна", "шестстотна", "седемстотна", "осемстотна", "деветстотна"];

const ORDINAL_MASC = [
  "нулев", "първи", "втори", "трети", "четвърти", "пети", "шести", "седми", "осми", "девети",
  "десети", "единадесети", "дванадесети", "тринадесети", "четиринадесети", "петнадесети",
  "шестнадесети", "седемнадесети", "осемнадесети", "деветнадесети",
  "двадесети",
];

const ORDINAL_FEM = [
  "нулева", "първа", "втора", "трета", "четвърта", "пета", "шеста", "седма", "осма", "девета",
  "десета", "единадесета", "дванадесета", "тринадесета", "четиринадесета", "петнадесета",
  "шестнадесета", "седемнадесета", "осемнадесета", "деветнадесета",
  "двадесета",
];

const MONTHS = [
  "януари", "февруари", "март", "април", "май", "юни",
  "юли", "август", "септември", "октомври", "ноември", "декември",
];

function threeDigitToWords(n: number, feminine: boolean = false, forceI: boolean = false): string {
  if (n === 0) return "";

  const ones = feminine ? ONES_FEM : ONES;
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const remainder = n % 100;

  if (h > 0) {
    parts.push(HUNDREDS[h]!);
  }

  if (remainder === 0) return parts.join(" ");

  if (remainder < 10) {
    if (parts.length > 0 || forceI) parts.push("и");
    parts.push(ones[remainder]!);
  } else if (remainder < 20) {
    if (parts.length > 0 || forceI) parts.push("и");
    parts.push(TEENS[remainder - 10]!);
  } else {
    const t = Math.floor(remainder / 10);
    const o = remainder % 10;
    if (o > 0) {
      const tenPart = TENS[t]! + " и " + ones[o]!;
      if (parts.length > 0) {
        parts.push(tenPart);
      } else {
        parts.push(tenPart);
      }
    } else {
      if (parts.length > 0) parts.push("и");
      parts.push(TENS[t]!);
    }
  }

  return parts.join(" ");
}

function numberToWords(n: number): string {
  if (n === 0) return "нула";
  if (n < 0) return "минус " + numberToWords(Math.abs(n));

  const parts: string[] = [];
  let remaining = n;

  const billions = Math.floor(remaining / 1_000_000_000);
  remaining %= 1_000_000_000;

  const millions = Math.floor(remaining / 1_000_000);
  remaining %= 1_000_000;

  const thousands = Math.floor(remaining / 1_000);
  remaining %= 1_000;

  if (billions > 0) {
    if (billions === 1) {
      parts.push("един милиард");
    } else {
      const w = threeDigitToWords(billions, true);
      parts.push(w + " милиарда");
    }
  }

  if (millions > 0) {
    if (millions === 1) {
      parts.push("един милион");
    } else {
      const w = threeDigitToWords(millions, true);
      parts.push(w + " милиона");
    }
  }

  if (thousands > 0) {
    if (thousands === 1) {
      parts.push("хиляда");
    } else {
      const w = threeDigitToWords(thousands, true);
      parts.push(w + " хиляди");
    }
  }

  if (remaining > 0) {
    const needI = parts.length > 0 && remaining < 100;
    const w = threeDigitToWords(remaining, false, needI);
    parts.push(w);
  }

  return parts.join(" ");
}

function yearToWordsFeminine(n: number): string {
  if (n <= 0) return String(n);

  const parts: string[] = [];
  let remaining = n;

  const thousands = Math.floor(remaining / 1_000);
  remaining %= 1_000;

  if (thousands > 0) {
    if (remaining === 0) {
      if (thousands === 1) return "хилядна";
      return threeDigitToWords(thousands, true) + " хилядна";
    }
    if (thousands === 1) {
      parts.push("хиляда");
    } else {
      parts.push(threeDigitToWords(thousands, true) + " хиляди");
    }
  }

  if (remaining === 0) return parts.join(" ");

  const h = Math.floor(remaining / 100);
  const to = remaining % 100;

  if (h > 0 && to === 0) {
    if (parts.length > 0) parts.push("и");
    parts.push(HUNDREDS_FEM_ORDINAL[h]!);
    return parts.join(" ");
  }

  if (h > 0) {
    parts.push(HUNDREDS[h]!);
  }

  if (to > 0) {
    if (to < 20) {
      if (h > 0) {
        parts.push("и");
      } else if (parts.length > 0) {
        parts.push("и");
      }
      parts.push(ORDINAL_FEM[to]!);
    } else {
      const t = Math.floor(to / 10);
      const o = to % 10;
      if (o > 0) {
        parts.push(TENS[t]! + " и " + ORDINAL_FEM[o]!);
      } else {
        if (parts.length > 0) parts.push("и");
        parts.push(TENS[t]! + "а");
      }
    }
  }

  return parts.join(" ");
}

function ordinalDayMasculine(day: number): string {
  if (day < 0 || day > 31) return String(day);

  if (day <= 20) return ORDINAL_MASC[day]!;

  const t = Math.floor(day / 10);
  const o = day % 10;
  if (o > 0) {
    if (t === 2) {
      const map: Record<number, string> = {
        1: "двадесет и първи", 2: "двадесет и втори", 3: "двадесет и трети",
        4: "двадесет и четвърти", 5: "двадесет и пети", 6: "двадесет и шести",
        7: "двадесет и седми", 8: "двадесет и осми", 9: "двадесет и девети",
      };
      return map[o] || TENS[t]! + " и " + ORDINAL_MASC[o]!;
    }
    return TENS[t]! + " и " + ORDINAL_MASC[o]!;
  }
  return TENS[t]!;
}

export function dateToBgWords(dateStr: string): string {
  const trimmed = dateStr.trim();
  const match = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!match) return trimmed;

  const day = parseInt(match[1]!, 10);
  const month = parseInt(match[2]!, 10);
  const year = parseInt(match[3]!, 10);

  const dayWord = ordinalDayMasculine(day);
  const monthWord = MONTHS[month - 1] || String(month);
  const yearWord = yearToWordsFeminine(year);

  return `${dayWord} ${monthWord} ${yearWord} година`;
}

export function numberToBgWords(n: number): string {
  return numberToWords(n);
}

export function currencyToBgWords(amount: number, currency: string): string {
  const intPart = Math.floor(Math.abs(amount));
  const cents = Math.round((Math.abs(amount) - intPart) * 100);

  let result = numberToWords(intPart) + " " + currency;

  if (cents > 0) {
    result += " и " + numberToWords(cents);
    if (cents === 1) {
      result += " евроцент";
    } else {
      result += " евроцента";
    }
  }

  return result;
}

export function percentageToBgWords(pct: number): string {
  const intPart = Math.round(Math.abs(pct));
  return numberToWords(intPart) + " процента";
}
