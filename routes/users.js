import { Router } from "express";
import { createUser, deleteUser, login, updateUser } from "../controllers/users.js";

const userRoutes = Router();

userRoutes.post("/signup", createUser);

userRoutes.post("/login", login);

userRoutes.put("/:userId", updateUser);

userRoutes.delete("/:userId", deleteUser);

export { userRoutes };