import express from "express";
import { createServer } from "http";
import { userRoutes } from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes)

export { app, server };