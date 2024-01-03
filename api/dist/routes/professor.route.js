"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const professor_controller_1 = require("../controller/professor.controller");
const jwt_1 = require("../middleware/jwt");
const router = (0, express_1.Router)();
router.get("/professor", jwt_1.validate, professor_controller_1.Get);
router.get("/professorSubjects", jwt_1.validate, professor_controller_1.GetSubjects);
exports.default = router;
