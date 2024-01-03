"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSubjects = exports.Get = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const db_1 = require("../utils/db");
const Get = (_req, res, _next) => {
    try {
        const query = "select t.Name from User u join Teacher t on t.User_Id = u.Id where t.User_Id = ? ";
        const value = [res.locals.userId];
        db_1.pool
            .execute(query, value)
            .then((result) => res.status(http_status_codes_1.default.OK).json(result[0]))
            .catch((err) => res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message }));
    }
    catch (error) {
        return res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};
exports.Get = Get;
const GetSubjects = (_req, res) => {
    try {
        const query = "select s.Name from User u join Teacher t on t.User_Id = u.Id join Subject s on s.Teacher_Id = t.Id where t.User_Id =? ";
        const value = [res.locals.userId];
        db_1.pool
            .execute(query, value)
            .then((result) => res.status(http_status_codes_1.default.OK).json(result[0]))
            .catch((err) => res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: err.message }));
    }
    catch (error) {
        return res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};
exports.GetSubjects = GetSubjects;
