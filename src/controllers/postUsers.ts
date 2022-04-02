import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { IUser } from "../repositories/user/interfaces";
import { UserRepository } from "../repositories";

export const postUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser: IUser = new UserRepository().postUsers(req.body);
    const saveUser: IUser = await new UserRepository().saveUsers(newUser);
    delete saveUser.password;
    res.status(201).json(saveUser);
  } catch (error) {
    if (error.driverError.detail.includes("already exists")) {
      res.status(201).json({ msg: "email already exists" });
    }
  }
};
