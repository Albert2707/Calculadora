"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controller/student.controller");
const jwt_1 = require("../middleware/jwt");
const router = (0, express_1.Router)();
router.get("/student", jwt_1.validate, student_controller_1.Get);
exports.default = router;
