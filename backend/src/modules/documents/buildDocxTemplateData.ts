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
        ? formatMoney(String(manualData.transaction.salePrice))
        : "";

    const depositAmountFormatted = manualData?.transaction?.depositAmount
        ? formatMoney(String(manualData.transaction.depositAmount))
        : "";

    const remainingAmountFormatted = manualData?.transaction?.remainingAmount
        ? formatMoney(String(manualData.transaction.remainingAmount))
        : "";

    const taxEvaluationFormatted = manualData?.taxEvaluation?.amount
        ? formatMoney(String(manualData.taxEvaluation.amount))
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
        bankIban: manualData?.bankDetails?.iban || ""
    };
}