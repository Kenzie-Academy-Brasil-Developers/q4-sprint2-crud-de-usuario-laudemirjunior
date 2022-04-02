import { DeleteResult } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "../repositories";

export const deleteUsers = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  const deleteUser: DeleteResult = await new UserRepository().deleteUser(uuid);

  res.status(200).json({ message: "User deleted with success" });
};
