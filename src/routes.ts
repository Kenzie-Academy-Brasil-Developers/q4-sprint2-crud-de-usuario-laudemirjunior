import { Router } from "express";
import {
  deleteUsers,
  getUsersProfile,
  loginUsers,
  patchUsers,
  postUsers,
} from "./controllers";
import { validateAdm, validateShape, validateToken } from "./middlewares";
import { loginUser, registerUser } from "./shapes";

const userRouter = Router();

userRouter.post("/users", validateShape(registerUser), postUsers);

userRouter.post("/login", validateShape(loginUser), loginUsers);

userRouter.get("/users", validateToken, validateAdm, getUsersProfile);

userRouter.get("/users/profile", validateToken, getUsersProfile);

userRouter.patch("/users/:uuid", validateToken, validateAdm, patchUsers);

userRouter.delete("/users/:uuid", validateToken, validateAdm, deleteUsers);

export default userRouter;
