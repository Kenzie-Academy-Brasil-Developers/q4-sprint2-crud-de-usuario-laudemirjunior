import { config } from "./../configs/index";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, config.secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Missing authorization headers" });
    }

    req.email = decoded.email;
    return next();
  });
};
