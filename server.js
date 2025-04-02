import express from "express";
import { createServer } from "http";
import { userRoutes } from "./routes/users.js";

const app = express();
const server = createServer(app);

app.use("/api/v1/users", userRoutes)

export { app, server };