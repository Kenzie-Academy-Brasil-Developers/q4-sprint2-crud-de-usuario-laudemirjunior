import bcrypt from "bcryptjs";
import { IUser, UserRepository } from "./../repositories";
import { Request, Response, NextFunction } from "express";
import { config } from "../configs";
import jsonwebtoken from "jsonwebtoken";

export const loginUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user: IUser = await new UserRepository().findUser("email", email);
  if (!user) {
    res.status(401).json({ message: "Wrong email/password" });
  }
  if (user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(401).json({ message: "Wrong email/password" });
    }
    const token = jsonwebtoken.sign({ email }, config.secretKey, {
      expiresIn: config.expiresIn,
    });
    res.status(200).json({ token: token });
  }
};
