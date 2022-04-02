import { IUser } from "./../repositories";
import { Response, NextFunction } from "express";
import { UserRepository } from "../repositories";

export const validateAdm = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  const { uuid } = req.params;

  const user: IUser = await new UserRepository().findUser("email", email);
  const userUuid: IUser = await new UserRepository().findUser("uuid", uuid);

  if (req.route.stack[0].method !== "get" && user.email !== userUuid?.email) {
    res.status(401).json({ message: "Missing admin permissions" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
  return next();
};
