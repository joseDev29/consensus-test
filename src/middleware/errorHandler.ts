import { Request, Response, NextFunction, Errback } from "express";

export const ErrorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Server Error: ", err);

  return res.status(500).json({
    ok: false,
    msg: "Internal server error, sorry!",
  });
};
