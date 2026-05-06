import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { parsePdfController } from "../controllers/document.controller";

const router = Router();

router.post('/parse-pdf', upload.single('file'), parsePdfController)

export default router;