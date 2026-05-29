export function generateDescription(data) {
    return `
${data.documentType} с идентификатор ${data.identifier},
с адрес ${data.address},
с площ ${data.area},
с предназначение ${data.purpose}.
    `.trim();
}
//# sourceMappingURL=generateDescription.js.map