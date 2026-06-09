import JSZip from "jszip";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { NotarialActTemplateData } from "../types/notarialAct.types.js";

function getTemplatePath(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, "..", "..", "templates", "notarial-act.docx");
}

function processConditionals(xml: string, hasPreliminary: boolean): string {
  if (hasPreliminary) {
    xml = xml.replace(/\[\[IF_PRELIMINARY_CONTRACT\]\]/g, "");
    xml = xml.replace(/\[\[IF_NO_PRELIMINARY_CONTRACT\]\][\s\S]*?\[\[END_IF\]\]/g, "");
  } else {
    xml = xml.replace(/\[\[IF_PRELIMINARY_CONTRACT\]\][\s\S]*?\[\[END_IF\]\]/g, "");
    xml = xml.replace(/\[\[IF_NO_PRELIMINARY_CONTRACT\]\]/g, "");
  }
  xml = xml.replace(/\[\[END_IF\]\]/g, "");
  return xml;
}

function getSectionNumbers(hasPreliminary: boolean) {
  const base = hasPreliminary ? 4 : 3;
  return {
    tax: base,
    declarations: base + 1,
    possession: base + 2,
    buyerAcceptance: base + 3,
    costs: base + 4,
    legal: base + 5,
  };
}

function collapseSplitPlaceholders(xml: string): string {
  const result: string[] = [];
  let i = 0;

  while (i < xml.length) {
    const openBrace = xml.indexOf("{{", i);
    if (openBrace === -1) {
      result.push(xml.substring(i));
      break;
    }

    result.push(xml.substring(i, openBrace));

    let pos = openBrace + 2;
    let keyChars = "";
    let found = false;

    while (pos < xml.length && !found) {
      if (xml.substring(pos, pos + 2) === "}}") {
        found = true;
        pos += 2;
      } else if (xml[pos] === "<") {
        const tagEnd = xml.indexOf(">", pos);
        if (tagEnd === -1) {
          pos = xml.length;
          break;
        }
        pos = tagEnd + 1;
      } else {
        keyChars += xml[pos];
        pos++;
      }
    }

    if (found) {
      result.push("{{" + keyChars + "}}");
    } else {
      result.push(xml.substring(openBrace, pos));
    }

    i = pos;
  }

  return result.join("");
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function boldMarkedToDocxXml(text: string): string {
  if (!text.includes("**")) return escapeXml(text);

  let result = "";
  let remaining = text;

  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      result += escapeXml(remaining);
      break;
    }

    result += escapeXml(remaining.slice(0, boldStart));
    const afterOpen = remaining.slice(boldStart + 2);
    const boldEnd = afterOpen.indexOf("**");

    if (boldEnd === -1) {
      result += "**" + escapeXml(afterOpen);
      break;
    }

    const boldText = afterOpen.slice(0, boldEnd);
    result +=
      `</w:t></w:r><w:r><w:rPr><w:b/><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia" w:cs="Georgia"/><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve">${escapeXml(boldText)}</w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia" w:cs="Georgia"/><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve">`;
    remaining = afterOpen.slice(boldEnd + 2);
  }

  return result;
}

function boldifyDescription(description: string, values: string[]): string {
  if (!values.length) return description;

  const sorted = [...new Set(values)]
    .filter((v) => v.length >= 3)
    .sort((a, b) => b.length - a.length);

  const ranges: [number, number, number][] = []; // [start, end, priority]

  for (const value of sorted) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped + "(?:\\s*\\([^)]+\\s?г\\.?\\s?\\)|\\s*\\([^)]+\\))?", "gi");

    let match: RegExpExecArray | null;
    while ((match = re.exec(description)) !== null) {
      const s = match.index;
      const e = match.index + match[0].length;
      const overlaps = ranges.some(([rs, re]) => s < re && e > rs);
      if (!overlaps) {
        ranges.push([s, e, value.length]);
      }
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const [s, e] of ranges) {
    const last = merged[merged.length - 1];
    if (last && s <= last[1]) {
      last[1] = Math.max(last[1], e);
    } else {
      merged.push([s, e]);
    }
  }

  let result = "";
  let pos = 0;
  for (const [s, e] of merged) {
    result += description.slice(pos, s);
    result += "**" + description.slice(s, e) + "**";
    pos = e;
  }
  result += description.slice(pos);

  return result;
}

function replacePlaceholders(
  xml: string,
  values: Record<string, string>,
  rawKeys: string[] = []
): string {
  for (const [key, value] of Object.entries(values)) {
    xml = xml.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, "g"),
      rawKeys.includes(key) ? value : escapeXml(value)
    );
  }
  return xml;
}

function overrideFontGlobally(xml: string): string {
  xml = xml.replace(
    /<w:rFonts w:ascii="[^"]*" w:hAnsi="[^"]*" w:cs="[^"]*"/g,
    '<w:rFonts w:ascii="Georgia" w:hAnsi="Georgia" w:cs="Georgia"'
  );
  xml = xml.replace(
    /<w:sz w:val="[^"]*"/g,
    '<w:sz w:val="21"'
  );
  return xml;
}

function formatBgNumber(n: number): string {
  return n.toLocaleString("bg-BG");
}

function formatBgDecimal(n: number): string {
  return n.toLocaleString("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export async function generateNotarialActDocx(
  data: NotarialActTemplateData
): Promise<Buffer> {
  const templatePath = getTemplatePath();
  const templateBuffer = fs.readFileSync(templatePath);
  const zip = await JSZip.loadAsync(templateBuffer);

  let xml = await zip.file("word/document.xml")!.async("string");

  xml = processConditionals(xml, data.hasPreliminaryContract);

  const sn = getSectionNumbers(data.hasPreliminaryContract);
  const issueDateClean = data.issueDate.replace(/\s*г\.\s*$/, "").trim();

  const boldifiedDescription = boldifyDescription(
    data.aiDescription,
    data.extractedDataValues
  );

  const replacements: Record<string, string> = {
    ACT_DATE: data.actDate,
    ACT_DATE_WORDS: data.actDateWords,
    NOTARY_NAME: data.notaryName,
    NOTARY_NUMBER: data.notaryNumber,
    COURT_DISTRICT: data.courtDistrict,
    NOTARY_OFFICE_ADDRESS: data.notaryOfficeAddress,
    SELLER_NAME: data.sellerName,
    SELLER_EGN: data.sellerEGN,
    SELLER_ID_CARD_NUMBER: data.sellerIdCardNumber,
    SELLER_ID_CARD_ISSUE_DATE: data.sellerIdCardIssueDate,
    SELLER_ID_CARD_ISSUER: data.sellerIdCardIssuer,
    SELLER_ADDRESS: data.sellerAddress,
    BUYER_NAME: data.buyerName,
    BUYER_EGN: data.buyerEGN,
    BUYER_ID_CARD_NUMBER: data.buyerIdCardNumber,
    BUYER_ID_CARD_ISSUE_DATE: data.buyerIdCardIssueDate,
    BUYER_ID_CARD_ISSUER: data.buyerIdCardIssuer,
    BUYER_ADDRESS: data.buyerAddress,
    AI_DESCRIPTION: boldMarkedToDocxXml(boldifiedDescription),
    PRICE: formatBgNumber(data.price),
    PRICE_CURRENCY: data.priceCurrency,
    PRICE_WORDS: data.priceWords,
    PRELIMINARY_CONTRACT_DATE: data.preliminaryContractDate,
    DEPOSIT_AMOUNT: formatBgNumber(data.depositAmount),
    DEPOSIT_AMOUNT_WORDS: data.depositAmountWords,
    DEPOSIT_PERCENTAGE: String(data.depositPercentage),
    DEPOSIT_PERCENTAGE_WORDS: data.depositPercentageWords,
    REMAINING_AMOUNT: formatBgNumber(data.remainingAmount),
    REMAINING_AMOUNT_WORDS: data.remainingAmountWords,
    BANK_NAME: data.bankName,
    BANK_BIC: data.bankBIC,
    BANK_IBAN: data.bankIBAN,
    TAX_SECTION_NUMBER: String(sn.tax),
    TAX_ASSESSMENT_VALUE: formatBgDecimal(data.taxAssessmentValue),
    TAX_ASSESSMENT_VALUE_WORDS: data.taxAssessmentValueWords,
    TAX_ASSESSMENT_CERT_NUMBER: data.taxAssessmentCertNumber,
    TAX_ASSESSMENT_ISSUE_DATE: data.taxAssessmentIssueDate,
    TAX_ASSESSMENT_ISSUER: data.taxAssessmentIssuer,
    DECLARATIONS_SECTION_NUMBER: String(sn.declarations),
    POSSESSION_SECTION_NUMBER: String(sn.possession),
    BUYER_ACCEPTANCE_SECTION_NUMBER: String(sn.buyerAcceptance),
    COSTS_SECTION_NUMBER: String(sn.costs),
    LEGAL_SECTION_NUMBER: String(sn.legal),
    DOCUMENT_NUMBER: data.documentNumber,
    ISSUE_DATE_CLEAN: issueDateClean,
  };

  xml = collapseSplitPlaceholders(xml);
  xml = replacePlaceholders(xml, replacements, ["AI_DESCRIPTION"]);
  xml = overrideFontGlobally(xml);

  zip.file("word/document.xml", xml);

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
