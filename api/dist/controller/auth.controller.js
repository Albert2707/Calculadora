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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLogin = void 0;
const db_1 = require("../utils/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("dotenv/config"));
config_1.default;
const PostLogin = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserName } = req.body;
        const [results] = yield db_1.pool.execute("SELECT * FROM `User` WHERE `Username`=?", [UserName]);
        if (!Object.entries(results).length)
            return res
                .status(http_status_codes_1.default.UNAUTHORIZED)
                .json({ Message: "Invalid username or password" });
        const password = bcryptjs_1.default.compareSync(req.body.Password, results[0].Password);
        if (!password)
            return res
                .status(http_status_codes_1.default.UNAUTHORIZED)
                .json({ Message: "Invalid username or password" });
        const _a = results[0], { Password } = _a, info = __rest(_a, ["Password"]);
        const options = { expiresIn: "3h" };
        const token = jsonwebtoken_1.default.sign(info, process.env.JWT_SECRETKEY, options);
        res.status(http_status_codes_1.default.OK).json(token);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});
exports.PostLogin = PostLogin;
