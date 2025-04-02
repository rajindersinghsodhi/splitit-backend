import express from "express";
import { createServer } from 'https';

const app = express();
const server = createServer(app);

export { app, server }