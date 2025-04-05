import { Router } from "express";
import { signup, deleteUser, login, updateUser } from "../controllers/users.js";
import { authentication } from "../middlewares/authentication.js";

const userRoutes = Router();

userRoutes.post("/signup", signup);

userRoutes.post("/login", login);

userRoutes.patch("/:userId", authentication, updateUser);

userRoutes.delete("/:userId", authentication, deleteUser);

export { userRoutes };