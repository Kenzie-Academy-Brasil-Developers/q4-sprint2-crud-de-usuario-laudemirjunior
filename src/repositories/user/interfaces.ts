import { User } from "./../../entities/User";
import { DeleteResult, UpdateResult } from "typeorm";

interface IUser {
  uuid: string;
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  createdOn: Date;
  updatedOn: Date;
}

interface CreationUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

interface IUserRepository {
  postUsers: (user: CreationUser) => IUser;
  saveUsers: (user: IUser) => Promise<IUser>;
  findUser: (key: string, value: string) => Promise<IUser>;
  findUsers: () => Promise<IUser[]>;
  patchUser: (
    uuid: string,
    update: { [x: string]: unknown }
  ) => Promise<UpdateResult>;
  deleteUser: (uuid: string) => Promise<DeleteResult>;
}

export { IUser, CreationUser, IUserRepository };
