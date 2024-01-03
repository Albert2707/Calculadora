import { Request, Response, NextFunction } from "express";
import { pool } from "../utils/db";
import bycrypt from "bcryptjs";
import codes from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv/config";
dotenv;
export const PostLogin = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { UserName } = req.body;
    const [results]: any = await pool.execute(
      "SELECT * FROM `User` WHERE `Username`=?",
      [UserName]
    );

    if (!Object.entries(results).length)
      return res
        .status(codes.UNAUTHORIZED)
        .json({ Message: "Invalid username or password" });
    const password = bycrypt.compareSync(
      req.body.Password,
      results[0].Password
    );
    if (!password)
      return res
        .status(codes.UNAUTHORIZED)
        .json({ Message: "Invalid username or password" });
    const { Password, ...info } = results[0];
    const options = { expiresIn: "3h" };
    const token = jwt.sign(info, process.env.JWT_SECRETKEY!, options);
    res.status(codes.OK).json(token);
  } catch (error: any) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
