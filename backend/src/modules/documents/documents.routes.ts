import { Router } from "express";
import path from "path";
import { getCaseById, createGeneratedDocument, updateCaseExtraction } from "../cases/cases.store.js";
import { generateDocx } from "./generateDocx.js";
import { buildDocxTemplateData } from "./buildDocxTemplateData.js";
import { extractWithLLM } from "../extraction/extractWithLLM.js";
import { validateLLMOutput } from "../extraction/validateLLMOutput.js";
import { detectDocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { buildPropertyDescription } from "../documents/property-description/buildPropertyDescription.js";

const router = Router();

router.post("/:id/generate-docx", async (req, res) => {
    const caseRecord = await getCaseById(req.params.id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    const outputPath = path.resolve(
        "generated",
        `notarial-act-${req.params.id}.docx`
    );

    const templateData = buildDocxTemplateData(caseRecord);

    generateDocx({
        templatePath: path.resolve("templates", "notarial-act-template.docx"),
        outputPath,
        data: templateData
    });

    await createGeneratedDocument(req.params.id, outputPath);

    return res.download(outputPath);
});

router.post("/:id/re-extract", async (req, res) => {
    const caseRecord = await getCaseById(req.params.id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    if (!caseRecord.rawText) {
        return res.status(400).json({
            error: "No raw text stored for this case — re-upload the PDF to re-extract"
        });
    }

    const documentType = caseRecord.documentType as any;

    let extractedData;
    let llmWarnings: string[] = [];

    if (process.env.OPENAI_API_KEY) {
        try {
            const llmResult = await extractWithLLM(caseRecord.rawText, documentType);
            const llmValidation = validateLLMOutput(llmResult, documentType);

            if (llmValidation.isValid) {
                extractedData = llmResult;
                llmWarnings = llmValidation.warnings;
            } else {
                console.warn(
                    "Re-extract LLM failed critical checks (%s), falling back to regex",
                    llmValidation.criticalFailures.join(", ")
                );
                extractedData = parseBasicCadastralData(caseRecord.rawText, documentType);
            }
        } catch (llmError) {
            console.warn("Re-extract LLM error, falling back to regex:", llmError);
            extractedData = parseBasicCadastralData(caseRecord.rawText, documentType);
        }
    } else {
        return res.status(400).json({
            error: "OPENAI_API_KEY not set — set it in .env to use AI re-extraction"
        });
    }

    const validation = validateCadastralData(extractedData);
    validation.warnings.push(...llmWarnings);

    const propertyDescription = buildPropertyDescription(extractedData);

    const updatedCase = await updateCaseExtraction(req.params.id, {
        extractedData,
        validation,
        propertyDescription
    });

    return res.json({
        message: "Case re-extracted successfully",
        caseId: updatedCase!.id,
        extractionMethod: "ai",
        extractedData: updatedCase!.extractionResult?.extractedJson,
        validation: updatedCase!.extractionResult?.validationJson,
        propertyDescription: updatedCase!.propertyDescription
    });
});

export default router;