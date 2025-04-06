import jwt from "jsonwebtoken";
import { JWT_KEY } from "./env.js";

const generateToken = (userData) => {
  const token = jwt.sign(userData, JWT_KEY);
  return token;
};

const verifyToken = (token) => {
  const result = jwt.verify(token, JWT_KEY);
  return result;
};

export { generateToken, verifyToken };