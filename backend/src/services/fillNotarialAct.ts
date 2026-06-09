import JSZip from "jszip";
import type { NotarialActTemplateData } from "../types/notarialAct.types.js";

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\u00A0/g, " ");
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

function wrapParagraph(text: string): string {
  return `    <w:p>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
          <w:sz w:val="24"/>
        </w:rPr>
        <w:t xml:space="preserve">${esc(text)}</w:t>
      </w:r>
    </w:p>`;
}

function separator(): string {
  return wrapParagraph(
    "---------------------------------------------------------------------------------------------------"
  );
}

function buildDocumentXml(paragraphs: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
${paragraphs.join("\n")}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1800"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

function formatNumber(n: number): string {
  return n.toLocaleString("bg-BG");
}

function buildActParagraphs(data: NotarialActTemplateData): string[] {
  const p: string[] = [];
  let n = 1;

  // === Preamble ===
  p.push(
    wrapParagraph(
      `Днес, ${data.actDate} (${data.actDateWords}), пред мен ${data.notaryName}, ` +
        `Нотариус с район на действие – ${data.courtDistrict}, вписана под ` +
        `№ ${data.notaryNumber} в регистъра на Нотариалната камара на Република България, ` +
        `в кантората ми в ${data.notaryOfficeAddress}, се явиха: ${data.sellerName} ` +
        `с ЕГН: ${data.sellerEGN}, притежаваща лична карта № ${data.sellerIdCardNumber}, ` +
        `издадена на ${data.sellerIdCardIssueDate} от ${data.sellerIdCardIssuer}, ` +
        `с постоянен адрес в ${data.sellerAddress}, в качеството ѝ на ПРОДАВАЧ ` +
        `от една страна, и от друга страна ${data.buyerName} с ЕГН ${data.buyerEGN}, ` +
        `притежаваща лична карта № ${data.buyerIdCardNumber}, издадена на ` +
        `${data.buyerIdCardIssueDate} от ${data.buyerIdCardIssuer}, с постоянен адрес ` +
        `${data.buyerAddress}, в качеството ѝ на КУПУВАЧ, и след като се уверих ` +
        `в тяхната самоличност и дееспособност, същите ми заявиха, че сключват ` +
        `следния договор:`
    )
  );

  p.push(separator());

  // === Point 1: Property description ===
  p.push(
    wrapParagraph(
      `           ${n}. ${data.sellerName} продава на ${data.buyerName} следния свой собствен недвижим имот, а именно:`
    )
  );
  n++;

  const descLines = data.aiDescription
    .trim()
    .split("\n")
    .filter((line) => line.trim().length > 0);
  for (const line of descLines) {
    p.push(wrapParagraph(line.trim()));
  }

  p.push(
    wrapParagraph(
      `за продажна цена в общ в размер на ${formatNumber(data.price)} ` +
        `${data.priceCurrency} (${data.priceWords}).-----------------------------------------------------------------`
    )
  );

  // === Point 2: Preliminary contract (conditional) ===
  if (data.hasPreliminaryContract) {
    p.push(
      wrapParagraph(
        `           ${n}. Продавачът ${data.sellerName} и купувача ${data.buyerName} ` +
          `заявяват, че по отношение на недвижимия имот по т. 1 от настоящия нотариален акт ` +
          `са подписали Предварителен договор от ${data.preliminaryContractDate}, по силата на ` +
          `който ${data.buyerName} е заплатил по банков път на ${data.sellerName} ` +
          `сума в размер на ${formatNumber(data.depositAmount)} ${data.priceCurrency} ` +
          `(${data.depositAmountWords}), представляваща капаро от ${data.depositPercentage} % ` +
          `(${data.depositPercentageWords}) от договорената обща продажна цена, като към датата ` +
          `на подписване на настоящия окончателен договор във формата на нотариален акт ` +
          `дължимата сума от общата продажна цена е в размер на ` +
          `${formatNumber(data.remainingAmount)} ${data.priceCurrency} ` +
          `(${data.remainingAmountWords}).--------------------------------------------`
      )
    );
    n++;

    // === Point 3: Remaining payment ===
    p.push(
      wrapParagraph(
        `           ${n}. Остатъкът от дължимата обща продажна цена за подробно описания ` +
          `в цялата предходна точка първа от нотариалния акт недвижим имот, в размер на ` +
          `${formatNumber(data.remainingAmount)} ${data.priceCurrency} ` +
          `(${data.remainingAmountWords}), Купувачът ${data.buyerName} ще заплати ` +
          `по банков път в деня на подписване на настоящия нотариален акт и преди вписването му ` +
          `в Служба по вписванията – град София, по банкова сметка на Продавача ` +
          `${data.sellerName}, открита при ${data.bankName}, BIC ${data.bankBIC}, ` +
          `IBAN ${data.bankIBAN}. --------------------------------------`
      )
    );
    n++;
  } else {
    // === Point 2: Full payment (no preliminary contract) ===
    p.push(
      wrapParagraph(
        `           ${n}. Продажната цена в размер на ${formatNumber(data.price)} ` +
          `${data.priceCurrency} (${data.priceWords}) Купувачът ${data.buyerName} ` +
          `ще заплати по банков път в деня на подписване на настоящия нотариален акт ` +
          `и преди вписването му в Служба по вписванията – град София, по банкова сметка на ` +
          `Продавача ${data.sellerName}, открита при ${data.bankName}, ` +
          `BIC ${data.bankBIC}, IBAN ${data.bankIBAN}. --------------------------------------`
      )
    );
    n++;
  }

  // === Tax assessment ===
  p.push(
    wrapParagraph(
      `           ${n}. Данъчната оценка на продавания недвижим имот е в размер на ` +
        `${formatNumber(data.taxAssessmentValue)} ${data.priceCurrency} ` +
        `(${data.taxAssessmentValueWords}), съгласно Удостоверение за данъчна оценка ` +
        `с изх. № ${data.taxAssessmentCertNumber}, издадено на ${data.taxAssessmentIssueDate} ` +
        `от ${data.taxAssessmentIssuer}; ---------------`
    )
  );
  n++;

  // === Seller declarations ===
  p.push(
    wrapParagraph(
      `           ${n}. Продавачът ${data.sellerName} декларира, че е единствен и ` +
        `пълноправен собственик на продавания недвижим имот описан в точка първа от ` +
        `нотариалния акт, че към настоящия момент имота, предмет на сделката не е обременен ` +
        `с вещни тежести, ипотечни задължения и възбрани, за имота няма сключени ` +
        `предварителни договори за продажба с трети лица, не е заложен по реда на Закона ` +
        `за особените залози, както и че не са налице други права на трети лица, които ` +
        `биха възпрепятствали Купувача да упражнява правото си на собственост в пълен обем. ` +
        `Продавачът декларира, че върху продавания имот няма учредени или запазени ` +
        `ограничени вещни права, че с продажбата на имота не се засягат правата на негови ` +
        `кредитори по реда и при условията на чл. 135 от ЗЗД и чл. 216 от ДОПК, че имота ` +
        `не служи като обезпечение в отношенията му с трети лица, както и че представя пред ` +
        `нотариуса всички налични документи, относно собствеността, че не знае за ` +
        `съществуването на други документи, касаещи правото на собственост върху ` +
        `продавания имот, и че представените документи са автентични и с вярно съдържание. ` +
        `В случай, че декларираното по-горе е невярно, в резултат на което Купувачът ` +
        `${data.buyerName} претърпи съдебно отстранение от недвижимия имот, предмет на ` +
        `настоящия договор, Продавачът ${data.sellerName} ѝ дължи незабавно връщане ` +
        `на цялата платена продажна цена, направените по тази сделка разходи, неустойка ` +
        `в размер на 10 % (десет процента) от продажната цена, извършените от Купувача ` +
        `подобрения в имота до датата на съдебното отстраняване. ` +
        `------------------------------------------------------------------------------------------`
    )
  );
  n++;

  // === Possession transfer ===
  p.push(
    wrapParagraph(
      `           ${n}. Владението върху продаваемия недвижим имот се предава след ` +
        `плащането на остатъкът от договорената обща продажна цена, съгласно условията ` +
        `на настоящия нотариален акт и в деня на неговото подписване, като Продавачът ` +
        `се задължава да предаде на Купувача владението върху недвижимия имот във вида, ` +
        `в който имотът е описан при подписване на настоящия договор. Продавачът се ` +
        `задължава да предаде на Купувача всички платежни документи и/или квитанции ` +
        `за платените консумативни разходи, като ток, вода, отопление, такси към ` +
        `етажната собственост и други, като всички разходи, произтичащи от собствеността ` +
        `и ползването на имота до датата на предаване на владението, са за сметка на ` +
        `Продавача. В случай, че владението на имота не бъде предадено след подписване ` +
        `на този нотариален акт и вписването му в имотния регистър на Агенция по ` +
        `вписванията, настоящият нотариален акт служи като основание за издаване на ` +
        `заповед за изпълнение по смисъла на чл. 417, т. 3, предл. последно от ГПК, ` +
        `по отношение предаване на владението имота. ` +
        `--------------------------------------------------------------------------------`
      )
    );
  n++;

  // === Buyer acceptance ===
  p.push(
    wrapParagraph(
      `           ${n}. Купувачът ${data.buyerName} заяви, че е съгласна и купува, ` +
        `подробно описания в точка първа на нотариалния акт недвижим имот, и при всички ` +
        `останали условия на този договор. ` +
        `-----------------------------------------------------------------------------`
      )
    );
  n++;

  // === Costs ===
  p.push(
    wrapParagraph(
      `           ${n}. Всички разходи по сключването на настоящия договор, са за ` +
        `сметка на Купувача. ------`
      )
    );
  n++;

  // === Legal declarations ===
  p.push(
    wrapParagraph(
      `           ${n}. Участниците в настоящото производство, след като бяха ` +
        `предупредени за наказателната отговорност, която носят за деклариране на ` +
        `неверни данни, съгласно българското законодателство и в изпълнение на ` +
        `разпоредбите на чл. 25, ал. 9 от ЗННД декларират, че сумата, посочена ` +
        `в настоящия нотариален акт като продажна цена, е действително уговореното ` +
        `между тях плащане. ` +
        `-----------------------------------------------------------------------------------------------`
      )
    );

  // === Notary certification ===
  p.push(
    wrapParagraph(
      `           Преди извършването и подписването на нотариалния акт, в изпълнение ` +
        `на задълженията си по чл. 25, ал. 1 от ЗННД, разясних на участващите ` +
        `в нотариалното производство лица, ясно и недвусмислено фактическото положение ` +
        `и правните последици от този договор, и се убедих, че същите го сключват ` +
        `по добра воля, че разбират смисъла и значението на акта, който извършват ` +
        `и желаят настъпването на правните му последици. ` +
        `---------------------------------------------------------`
      )
  );

  p.push(
    wrapParagraph(
      `           След като се уверих от представените ми документи, че Продавача ` +
        `е собственик на продавания имот и че са изпълнени особените изисквания на ` +
        `закона, одобрих представеният ми от страните нотариален акт. Актът се прочете ` +
        `на страните и участници в нотариалното производство и след като ми заявиха, ` +
        `че разбират правните последици от тази сделка и след тяхното одобрение, акта ` +
        `се подписа от тях в шест екземпляра, като собственоръчно изписаха трите си ` +
        `имена, и от мен – Нотариуса. ` +
        `-------------------------------------------------------------------------`
      )
  );

  // === Documents presented ===
  p.push(
    wrapParagraph(
      `           При съставянето на акта ми се представиха следните документи, ` +
        `удостоверяващи правото на собственост и изпълнението на особените изисквания ` +
        `на закона: ${data.previousDeedDescription} ` +
        `----------------`
      )
  );

  // === Signatures ===
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph("ПРОДАВАЧ:  __________________"));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph("_____________________________________________________________"));
  p.push(wrapParagraph(`/ ${data.sellerName} /`));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph("КУПУВАЧ:   ______________________"));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph("_____________________________________________________________"));
  p.push(wrapParagraph(`/ ${data.buyerName} /`));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(wrapParagraph(""));
  p.push(
    wrapParagraph(
      "                                                  НОТАРИУС:"
    )
  );

  return p;
}

export async function generateNotarialActDocx(
  data: NotarialActTemplateData
): Promise<Buffer> {
  const paragraphs = buildActParagraphs(data);
  const documentXml = buildDocumentXml(paragraphs);

  const zip = new JSZip();
  zip.file("[Content_Types].xml", CONTENT_TYPES);
  zip.file("_rels/.rels", RELS);
  zip.file("word/_rels/document.xml.rels", DOCUMENT_RELS);
  zip.file("word/document.xml", documentXml);

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
