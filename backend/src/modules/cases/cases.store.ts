import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { BasicCadastralData } from "../extraction/parseCadastralData.js";
import { ValidationResult } from "../extraction/validateCadastralData.js";
import { ManualCaseData } from "./manualCaseData.types.js";


export async function createCase(input: {
    fileName: string;
    documentType: string;
    extractedData: BasicCadastralData;
    validation: ValidationResult;
    propertyDescription: string;
    manualData: ManualCaseData | null;
}) {
    return prisma.case.create({
        data: {
            fileName: input.fileName,
            documentType: input.documentType,
            propertyDescription: input.propertyDescription,
            extractionResult: {
                create: {
                    extractedJson: input.extractedData as unknown as Prisma.InputJsonValue,
                    validationJson: input.validation as unknown as Prisma.InputJsonValue
                }
            },
            manualCaseData: input.manualData
                ? {
                    create: {
                        dataJson: input.manualData as unknown as Prisma.InputJsonValue
                    }
                }
                : undefined
        },
        include: {
            extractionResult: true,
            manualCaseData: true,
            generatedDocuments: true
        }
    });
}

export async function getCaseById(id: string) {
    return prisma.case.findUnique({
        where: { id },
        include: {
            extractionResult: true,
            manualCaseData: true,
            generatedDocuments: true
        }
    });
}

export async function updateCaseManualData(
    id: string,
    manualData: ManualCaseData
) {
    const existingCase = await prisma.case.findUnique({
        where: { id },
        include: { manualCaseData: true }
    });

    if (!existingCase) {
        return null;
    }

    if (existingCase.manualCaseData) {
        await prisma.manualCaseData.update({
            where: { caseId: id },
            data: { dataJson: manualData as unknown as Prisma.InputJsonValue }
        });
    } else {
        await prisma.manualCaseData.create({
            data: {
                caseId: id,
                dataJson: manualData as unknown as Prisma.InputJsonValue
            }
        });
    }

    return getCaseById(id);
}

export async function createGeneratedDocument(
    caseId: string,
    filePath: string
) {
    const existingCount = await prisma.generatedDocument.count({
        where: {
            caseId
        }
    });

    return prisma.generatedDocument.create({
        data: {
            caseId,
            filePath,
            version: existingCount + 1
        }
    });
}