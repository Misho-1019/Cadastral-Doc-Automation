import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { generateDocxController, parsePdfController } from "../controllers/document.controller";

const router = Router();

router.post('/parse-pdf', upload.single('file'), parsePdfController)
router.post('/generate-docx', generateDocxController)

export default router;