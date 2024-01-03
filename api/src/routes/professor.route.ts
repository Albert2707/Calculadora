import { Router } from "express";
import { Get, GetSubjects } from "../controller/professor.controller";
import { validate } from "../middleware/jwt";
const router = Router();

router.get("/professor", validate, Get);
router.get("/professorSubjects", validate, GetSubjects);

export default router;
