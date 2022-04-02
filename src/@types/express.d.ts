import { IUser } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      email: string;
      user: IUser;
      validated: IUser;
    }
  }
}
