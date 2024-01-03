"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = (0, promise_1.createPool)({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    port: 3306,
    password: process.env.PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});
