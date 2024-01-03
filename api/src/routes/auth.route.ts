import { Router } from "express";
import { PostLogin } from "../controller/auth.controller";
const router = Router();

router.post("/auth", PostLogin);

export default router;
