export function validateExtractedData(data) {
    const errors = [];
    if (!data.documentType) {
        errors.push("Missing documentType");
    }
    if (!data.identifier) {
        errors.push("Missing identifier");
    }
    if (!data.address) {
        errors.push("Missing address");
    }
    return errors;
}
//# sourceMappingURL=validateExtractedData.js.map