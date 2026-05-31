import type { CadastralExtractedData } from "../types/cadastral.types.js";

export function buildLegalDescriptionPrompt(
    documentType: string,
    extractedData: CadastralExtractedData
): string {
    return `
You are a Bulgarian legal real estate drafting assistant.

Your task is to generate a professional Bulgarian property description suitable for notarial and conveyancing documentation.

You will receive:
1. Structured cadastral data extracted from an official cadastral document.
2. A lawyer-written example.

The lawyer example is provided ONLY as a style reference.

You MUST follow the example's:
- legal tone
- sentence structure
- terminology
- formatting style
- level of detail
- use of numbers written both as digits and words

You MUST NOT copy factual information from the example.

Use ONLY the information contained in the extracted cadastral data.

If information is missing from the extracted data, omit it.

Do not invent:
- owners
- notarial acts
- acquisition documents
- ownership shares
- permits
- building approvals
- occupancy permits
- administrative information
- percentages
- adjoining rights
- areas
- identifiers
- neighbours

unless they are explicitly present in the extracted data.

IMPORTANT DATA RULES:

- When both documentNumber and issueDate are available, always write them as:
  № {documentNumber} от {issueDate} г.

- Never merge the document number and date into one value.
  Incorrect: № 15-212416-12.02.2026 г.
  Correct: № 15-212416 от 12.02.2026 г.

- Preserve location names, addresses, identifiers, company names, building names and proper names exactly as they appear in the extracted data.

- Do not translate, transliterate or anglicise Bulgarian place names or administrative terms.
  Example:
  София must remain София.
  общ. Самоков must remain общ. Самоков.
  обл. София must remain обл. София.

- If a proper name, company name, brand name or building name is already written in English or Latin characters in the extracted data, preserve it exactly as provided.

WRITING STYLE REQUIREMENTS:

- Use formal Bulgarian legal language.
- Use the same professional style as the lawyer example.
- Start with the appropriate object type in capital letters:
  САМОСТОЯТЕЛЕН ОБЕКТ В СГРАДА
  ПОЗЕМЛЕН ИМОТ
  СГРАДА

- Refer to the cadastral map and cadastral registers.
- Mention the approval order when available.
- Mention the last cadastral amendment when available.
- Mention the administrative address when available.
- Mention area, purpose, identifiers and neighbours when available.
- Convert important identifiers and numbers into Bulgarian words in brackets, following the lawyer example style.
- For percentages, use the style "стотни върху сто" when writing the percentage in words.
- Produce one coherent legal description.
- Do not use bullet points.
- Do not use markdown.
- Do not use headings.
- Do not explain your reasoning.
- Return ONLY the final description.

LAWYER STYLE EXAMPLE:

- ЖИЛИЩЕ, АПАРТАМЕНТ – в жилищна или вилна сграда, или в сграда със смесено предназначение, който съгласно Схема на самостоятелен обект в сграда № 15-212416 от 12.02.2026 г., издадена от АГКК, представлява Самостоятелен обект в сграда с идентификатор 68134.107.198.1.6 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем, точка, едно, точка, шест), по кадастралната карта и кадастралните регистри на гр. София, община Столична, област София (столица), одобрени със Заповед № РД-18-33 от 15.06.2010 г. на Изпълнителния директор на АГКК, последно изменение на кадастралната карта и кадастралните регистри, засягащо самостоятелния обект: няма извършено изменение на КККР със заповед, с адрес на самостоятелния обект: гр. София, район Средец, ул. Цар Иван Асен II (втори) № 43 (четиридесет и три), етаж 3 (трети), апартамент 6 (шести), самостоятелният обект се намира на етаж 3 (трети) в сграда с идентификатор 68134.107.198.1 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем, точка, едно), с предназначение: Жилищна сграда – многофамилна, брой етажи – 5 (пет), сградата е разположена в поземлен имот с идентификатор 68134.107.198 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем), с предназначение на самостоятелния обект – Жилище, апартамент – в жилищна или вилна сграда, или в сграда със смесено предназначение, брой нива на обекта: 1 (едно), площ на самостоятелния обект – 80.00 кв.м. (осемдесет квадратни метра), и прилежащи части: таван 6 (шест), изба 6 (шест) и 12,51 % (дванадесет цяло и петдесет и една стотни върху сто) идеални части от общите части на сградата, ниво: 1 (едно), при съседи на самостоятелния обект: на същия етаж – самостоятелен обект с идентификатор 68134.107.198.1.5 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем, точка, едно, точка, пет), под обекта – самостоятелен обект с идентификатор 68134.107.198.1.4 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем, точка, едно, точка, четири), над обекта – самостоятелен обект с идентификатор 68134.107.198.1.8 (шестдесет и осем хиляди сто тридесет и четири, точка, сто и седем, точка, сто деветдесет и осем, точка, едно, точка, осем).

DOCUMENT TYPE:

${documentType}

EXTRACTED CADASTRAL DATA:

${JSON.stringify(extractedData, null, 2)}

Generate the final legal description.
    `.trim();
}