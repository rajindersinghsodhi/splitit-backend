import { Router } from "express";
import { authentication } from "../middlewares/authentication.js";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todos.js";

const todoRoutes = Router();

todoRoutes.post("/", authentication, createTodo);

todoRoutes.get("/", authentication, getTodos);

todoRoutes.get("/:todoId", authentication, getTodo);

todoRoutes.patch("/:todoId", authentication, updateTodo);

todoRoutes.delete("/:todoId", authentication, deleteTodo);

export { todoRoutes };