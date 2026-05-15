import { Router } from "express";
import { getCaseById, updateCaseManualData } from "./cases.store.js";
import { validateManualCaseData } from "./validateManualCaseData.js";
import { normalizeManualCaseData } from "./normalizeManualCaseData.js";

const router = Router();

router.get("/:id", async (req, res) => {
    const caseRecord = await getCaseById(req.params.id);

    if (!caseRecord) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    return res.json(caseRecord);
});

router.patch("/:id/manual-data", async (req, res) => {
    const normalizedManualData = normalizeManualCaseData(req.body);

    const validationResult = validateManualCaseData(normalizedManualData);

    if (!validationResult.isValid) {
        return res.status(400).json({
            error: "Invalid manual data",
            validationErrors: validationResult.errors
        });
    }
    
    const updatedCase = await updateCaseManualData(req.params.id, normalizedManualData);

    if (!updatedCase) {
        return res.status(404).json({
            error: "Case not found"
        });
    }

    return res.json({
        message: "Manual data updated successfully",
        case: updatedCase
    });
});

export default router;