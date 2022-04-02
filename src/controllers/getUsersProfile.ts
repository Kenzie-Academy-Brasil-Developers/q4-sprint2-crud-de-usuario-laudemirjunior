import { Request, Response } from "express";
import { IUser, UserRepository } from "../repositories";

export const getUsersProfile = async (req: any, res: Response) => {
  const { email } = req;
  const user: IUser = await new UserRepository().findUser("email", email);
  delete user.password;
  res.status(200).json(user);
};
