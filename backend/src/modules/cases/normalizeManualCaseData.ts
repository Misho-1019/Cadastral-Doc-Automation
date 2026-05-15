import { ManualCaseData } from "./manualCaseData.types.js";

export function normalizeManualCaseData(
    data: ManualCaseData
): ManualCaseData {
    return {
        seller: {
            fullName: normalizeText(data.seller?.fullName)
        },

        buyer: {
            fullName: normalizeText(data.buyer?.fullName)
        },

        transaction: {
            salePrice: normalizeMoney(data.transaction?.salePrice),
            depositAmount: normalizeMoney(data.transaction?.depositAmount),
            remainingAmount: normalizeMoney(data.transaction?.remainingAmount),

            contractDate: normalizeText(data.transaction?.contractDate),
            preliminaryContractDate: normalizeText(
                data.transaction?.preliminaryContractDate
            )
        },

        taxEvaluation: {
            amount: normalizeMoney(data.taxEvaluation?.amount),
            number: normalizeText(data.taxEvaluation?.number),
            date: normalizeText(data.taxEvaluation?.date)
        },

        notary: {
            name: normalizeText(data.notary?.name)
        },

        ownershipDocument: data.ownershipDocument || {},

        bankDetails: {
            bic: normalizeBic(data.bankDetails?.bic),
            iban: normalizeIban(data.bankDetails?.iban)
        }
    };
}

function normalizeText(value?: string): string {
    return value?.trim() || "";
}

function normalizeMoney(value?: string): string {
    if (!value) {
        return "";
    }

    return value
        .replace(/\s+/g, "")
        .replace(",", ".");
}

function normalizeBic(value?: string): string {
    return value
        ? value.replace(/\s+/g, "").toUpperCase()
        : "";
}

function normalizeIban(value?: string): string {
    return value
        ? value.replace(/\s+/g, "").toUpperCase()
        : "";
}