"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const config_1 = __importDefault(require("dotenv/config"));
config_1.default;
const validate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(http_status_codes_1.default.UNAUTHORIZED)
            .json({ message: "You are not authenticated" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETKEY, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res
                .status(http_status_codes_1.default.FORBIDDEN)
                .json({ message: "Token is invalid" });
        res.locals.userId = payload.Id;
    }));
    next();
};
exports.validate = validate;
