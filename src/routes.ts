import { getUserProfile } from "./controllers/getUserProfile";
import { validateAdm } from "./middlewares/validateAdm";
import { validateToken } from "./middlewares/validateToken";
import { getUsers } from "./controllers/getUsers";
import { loginUser } from "./shapes/loginUser";
import { registerUser } from "./shapes/registerUser";
import { validateShape } from "./middlewares/validateShape";
import { Router } from "express";
import { loginUsers, postUsers } from "./controllers";
import { patchUser } from "./controllers/patchUser";
import { deleteUsers } from "./controllers/deleteUsers";

const userRouter = Router();

userRouter.post("/users", validateShape(registerUser), postUsers);

userRouter.post("/login", validateShape(loginUser), loginUsers);

userRouter.get("/users", validateToken, validateAdm, getUsers);

userRouter.get("/users/profile", validateToken, getUserProfile);

userRouter.patch("/users/:uuid", validateToken, validateAdm, patchUser);

userRouter.delete("/users/:uuid", validateToken, validateAdm, deleteUsers);

export default userRouter;
