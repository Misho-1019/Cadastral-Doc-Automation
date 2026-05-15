import { ManualCaseData } from "./manualCaseData.types.js";

export type ManualDataValidationResult = {
    isValid: boolean;
    errors: string[];
};

export function validateManualCaseData(
    data: ManualCaseData
): ManualDataValidationResult {
    const errors: string[] = [];

    if (!data.seller?.fullName) {
        errors.push("Seller full name is required");
    }

    if (!data.buyer?.fullName) {
        errors.push("Buyer full name is required");
    }

    if (!data.transaction?.salePrice) {
        errors.push("Sale price is required");
    }

    if (!data.transaction?.depositAmount) {
        errors.push("Deposit amount is required");
    }

    if (!data.transaction?.remainingAmount) {
        errors.push("Remaining amount is required");
    }

    if (!data.taxEvaluation?.amount) {
        errors.push("Tax evaluation amount is required");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}