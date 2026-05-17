import { formatDisplayIban } from "../formatting/formatDisplayIban.js";
import { formatDisplayMoney } from "../formatting/formatDisplayMoney.js";
import { formatMoney } from "../formatting/formatMoney.js";

type CaseWithRelations = {
    propertyDescription: string;
    manualCaseData: {
        dataJson: unknown;
    } | null;
};

export function buildDocxTemplateData(caseRecord: CaseWithRelations) {
    const manualData = caseRecord.manualCaseData?.dataJson as any;

    const salePriceFormatted = manualData?.transaction?.salePrice
        ? `${formatDisplayMoney(String(manualData.transaction.salePrice))} евро (${formatMoney(String(manualData.transaction.salePrice)).split("(")[1]}`
        : "";

    const depositAmountFormatted = manualData?.transaction?.depositAmount
        ? `${formatDisplayMoney(String(manualData.transaction.depositAmount))} евро (${formatMoney(String(manualData.transaction.depositAmount)).split("(")[1]}`
        : "";

    const remainingAmountFormatted = manualData?.transaction?.remainingAmount
        ? `${formatDisplayMoney(String(manualData.transaction.remainingAmount))} евро (${formatMoney(String(manualData.transaction.remainingAmount)).split("(")[1]}`
        : "";

    const taxEvaluationFormatted = manualData?.taxEvaluation?.amount
        ? `${formatDisplayMoney(String(manualData.taxEvaluation.amount))} евро (${formatMoney(String(manualData.taxEvaluation.amount)).split("(")[1]}`
        : "";

    return {
        propertyDescription: caseRecord.propertyDescription,

        sellerName: manualData?.seller?.fullName || "",
        buyerName: manualData?.buyer?.fullName || "",

        salePriceFormatted,
        depositAmountFormatted,
        remainingAmountFormatted,
        taxEvaluationFormatted,

        contractDate: manualData?.transaction?.contractDate || "",
        preliminaryContractDate: manualData?.transaction?.preliminaryContractDate || "",

        taxEvaluationNumber: manualData?.taxEvaluation?.number || "",
        taxEvaluationDate: manualData?.taxEvaluation?.date || "",

        notaryName: manualData?.notary?.name || "",

        bankBic: manualData?.bankDetails?.bic || "",
        bankIban: manualData?.bankDetails?.iban ? formatDisplayIban(manualData.bankDetails.iban) : "",
    };
}