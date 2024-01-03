import { NextFunction, Request, Response } from "express";
import codes from "http-status-codes";
import { pool } from "../utils/db";

export const Get = (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const query =
      "select t.Name from User u join Teacher t on t.User_Id = u.Id where t.User_Id = ? ";
    const value = [res.locals.userId];
    pool
      .execute(query, value)
      .then((result) => res.status(codes.OK).json(result[0]))
      .catch((err) =>
        res.status(codes.INTERNAL_SERVER_ERROR).json({ message: err.message })
      );
  } catch (error: any) {
    return res
      .status(codes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const GetSubjects = (_req: Request, res: Response) => {
  try {
    const query =
      "select s.Name from User u join Teacher t on t.User_Id = u.Id join Subject s on s.Teacher_Id = t.Id where t.User_Id =? ";
    const value = [res.locals.userId];
    pool
      .execute(query, value)
      .then((result) => res.status(codes.OK).json(result[0]))
      .catch((err) =>
        res.status(codes.INTERNAL_SERVER_ERROR).json({ message: err.message })
      );
  } catch (error: any) {
    return res
      .status(codes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
