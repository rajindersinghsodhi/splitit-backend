import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    res.send(`<h1>This will fetch all users</h1>`)
})

userRoutes.post("/", (req, res) => {
    res.send(`<h1>This will post a user</h1>`)
})

userRoutes.put("/", (req, res) => {
    res.send(`<h1>This will update user</h1>`)
})

userRoutes.delete("/", (req, res) => {
    res.send(`<h1>This will delete user</h1>`)
})

export { userRoutes };