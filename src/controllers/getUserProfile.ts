import { Request, Response } from "express";
import { IUser, UserRepository } from "../repositories";

export const getUserProfile = async (req: Request, res: Response) => {
  const user: IUser = await new UserRepository().findUser(
    "email",
    req.body.email
  );
  delete user.password;
  res.status(200).json(user);
};
