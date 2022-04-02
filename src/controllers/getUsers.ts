import { IUser } from "./../repositories";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users: IUser[] = await new UserRepository().findUsers();
  users.forEach((item: IUser) => delete item.password);
  res.status(200).json(users);
};
