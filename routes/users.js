import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:userId", getUser);

userRoutes.post("/", addUser);

userRoutes.put("/:userId", updateUser);

userRoutes.delete("/:userId", deleteUser);

export { userRoutes };