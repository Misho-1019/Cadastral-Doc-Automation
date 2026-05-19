import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../extraction/extractText.js";
import { detectDocumentType } from "../extraction/detectDocumentType.js";
import { parseBasicCadastralData } from "../extraction/parseCadastralData.js";
import { normalizePdfText } from "../extraction/normalizeText.js";
import { validateCadastralData } from "../extraction/validateCadastralData.js";
import { buildPropertyDescription } from "../documents/property-description/buildPropertyDescription.js";
import { createCase } from "../cases/cases.store.js";
import { validateManualCaseData } from "../cases/validateManualCaseData.js";
import { normalizeManualCaseData } from "../cases/normalizeManualCaseData.js";
import { extractWithLLM } from "../extraction/extractWithLLM.js";
import { validateLLMOutput } from "../extraction/validateLLMOutput.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        const rawText = await extractTextFromPdf(req.file.buffer);
        const text = normalizePdfText(rawText);

        const documentType = detectDocumentType(text);

        let extractedData;
        let extractionMethod = "regex";
        let llmWarnings: string[] = [];

        if (process.env.OPENAI_API_KEY) {
            try {
                const llmResult = await extractWithLLM(text, documentType);
                const llmValidation = validateLLMOutput(llmResult, documentType);

                if (llmValidation.isValid) {
                    extractedData = llmResult;
                    extractionMethod = "ai";
                    llmWarnings = llmValidation.warnings;
                } else {
                    console.warn(
                        "LLM extraction failed critical checks (%s), falling back to regex",
                        llmValidation.criticalFailures.join(", ")
                    );
                    extractedData = parseBasicCadastralData(text, documentType);
                }
            } catch (llmError) {
                console.warn("LLM extraction error, falling back to regex:", llmError);
                extractedData = parseBasicCadastralData(text, documentType);
            }
        } else {
            extractedData = parseBasicCadastralData(text, documentType);
        }

        const validation = validateCadastralData(extractedData);

        validation.warnings.push(...llmWarnings);

        const propertyDescription = buildPropertyDescription(extractedData);

        const rawManualData = req.body.manualData
            ? JSON.parse(req.body.manualData)
            : null;

        const manualData = rawManualData
            ? normalizeManualCaseData(rawManualData)
            : null;

        const validationResult = manualData
            ? validateManualCaseData(manualData)
            : null;

        if (validationResult && !validationResult.isValid) {
            return res.status(400).json({
                error: "Invalid manual data",
                validationErrors: validationResult.errors
            });
        }

        const caseRecord = await createCase({
            fileName: req.file.originalname,
            documentType,
            extractedData,
            validation,
            propertyDescription,
            manualData
        });

        return res.json({
            message: "Case created successfully",
            caseId: caseRecord.id,
            extractionMethod,
            fileName: caseRecord.fileName,
            documentType: caseRecord.documentType,
            extractedData: caseRecord.extractionResult?.extractedJson,
            validation: caseRecord.extractionResult?.validationJson,
            propertyDescription: caseRecord.propertyDescription
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to process PDF"
        });
    }
});

export default router;