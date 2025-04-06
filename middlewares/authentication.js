import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env.js";
import { User } from "../models/user.js";

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                status: "error",
                message: "Access denied. Please login to continue"
            })
        }

        const tokenData = jwt.verify(token, JWT_KEY);

        const userDetails = await User.findById(tokenData.userId);
        
        if(!userDetails){
            return res.status(401).json({
                status: "error",
                message: "Access denied. Please login to continue"
            })
        }
        
        req.user = userDetails;
        next();
    } catch (error) {
        return res.status(401).json(
            {
                "status": "error",
                "message": error.message
            }
        )
    }
}

export { authentication };