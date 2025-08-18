import { NextFunction, Request, Response } from "express";

export const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req as Request, res, next).catch(next);
};

//simplifies the error handling in rou