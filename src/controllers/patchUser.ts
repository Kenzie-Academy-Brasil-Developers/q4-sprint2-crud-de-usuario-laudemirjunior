import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { IUser, UserRepository } from "../repositories";
import { UpdateResult } from "typeorm";

export const patchUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { body } = req;
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }
  for (const [key, value] of Object.entries(body)) {
    if (key !== "isAdm") {
      const updatedUser: UpdateResult = await new UserRepository().patchUser(
        uuid,
        {
          [key]: value,
        }
      );
    }
  }
  const user: IUser = await new UserRepository().findUser("uuid", uuid);
  delete user.password;
  res.status(200).json(user);
};
