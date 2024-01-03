import { pool } from "../utils/db";
import jwt from "jsonwebtoken";
import codes from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const Get = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const [result] = await pool.query("select * from Student");
    res.status(codes.OK).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
