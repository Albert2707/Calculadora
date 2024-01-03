import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import codes from "http-status-codes";
import dotenv from "dotenv/config";
dotenv;

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(codes.UNAUTHORIZED)
      .json({ message: "You are not authenticated" });

  jwt.verify(
    token,
    process.env.JWT_SECRETKEY!,
    async (err: any, payload: any) => {
      if (err)
        return res
          .status(codes.FORBIDDEN)
          .json({ message: "Token is invalid" });
      res.locals.userId = payload.Id;
    }
  );
  next();
};
