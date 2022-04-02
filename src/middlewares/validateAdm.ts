import { IUser } from "./../repositories";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";

export const validateAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  const { uuid } = req.params;
  const user: IUser = await new UserRepository().findUser("email", email);
  const userUuid: IUser = await new UserRepository().findUser("uuid", uuid);
  if (
    (req.route.stack[0].method === "patch" || "delete") &&
    !user.isAdm &&
    user.email !== userUuid.email
  ) {
    res.status(401).json({ message: "Missing admin permissions" });
  }
  if (req.route.stack[0].method === "get" && !user.isAdm) {
    res.status(401).json({ message: "Unauthorized" });
  }
  return next();
};
