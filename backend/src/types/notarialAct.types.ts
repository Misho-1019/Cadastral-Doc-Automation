export interface NotarialActFormData {
  notaryName: string;
  notaryNumber: string;
  courtDistrict: string;
  notaryOfficeAddress: string;
  actDate: string;
  actPlace: string;

  sellerName: string;
  sellerEGN: string;
  sellerIdCardNumber: string;
  sellerIdCardIssueDate: string;
  sellerIdCardIssuer: string;
  sellerAddress: string;

  buyerName: string;
  buyerEGN: string;
  buyerIdCardNumber: string;
  buyerIdCardIssueDate: string;
  buyerIdCardIssuer: string;
  buyerAddress: string;

  price: number;
  priceCurrency: string;
  preliminaryContractDate: string;
  hasPreliminaryContract: boolean;
  depositAmount: number;
  depositPercentage: number;

  bankName: string;
  bankBIC: string;
  bankIBAN: string;

  taxAssessmentValue: number;
  taxAssessmentCertNumber: string;
  taxAssessmentIssueDate: string;
  taxAssessmentIssuer: string;

  previousDeedDescription: string;
}

export interface NotarialActTemplateData extends NotarialActFormData {
  aiDescription: string;
  documentNumber: string;
  issueDate: string;

  extractedDataValues: string[];

  actDateWords: string;
  priceWords: string;
  depositAmountWords: string;
  depositPercentageWords: string;
  remainingAmount: number;
  remainingAmountWords: string;
  taxAssessmentValueWords: string;
}
