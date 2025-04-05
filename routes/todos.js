import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { createTodo, getTodos } from "../controllers/todos.js";

const todoRoutes = Router();

todoRoutes.post("/", authentication, createTodo);

todoRoutes.get("/", authentication, getTodos);

export { todoRoutes };