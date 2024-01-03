import { Router } from "express";
import { Get } from "../controller/student.controller";
import { validate } from "../middleware/jwt";

const router = Router();

router.get("/student", validate, Get);

export default router;
