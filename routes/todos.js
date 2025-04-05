import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { createTodo, getTodo, getTodos, updateTodo } from "../controllers/todos.js";

const todoRoutes = Router();

todoRoutes.post("/", authentication, createTodo);

todoRoutes.get("/", authentication, getTodos);

todoRoutes.get("/:todoId", authentication, getTodo);

todoRoutes.patch("/:todoId", authentication, updateTodo);

export { todoRoutes };