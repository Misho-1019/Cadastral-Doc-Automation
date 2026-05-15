import { Router } from "express";
import path from "path";
import { getCaseById, createGeneratedDocument } from "../cases/cases.store.js";
import { generateDocx } from "./generateDocx.js";
import { buildDocxTemplateData } from "./buildDocxTemplateData.js";

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

export default router;