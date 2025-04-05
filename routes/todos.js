import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { createTodo } from "../controllers/todos.js";

const todoRoutes = Router();

todoRoutes.post("/", authentication, createTodo);

export { todoRoutes };