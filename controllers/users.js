import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { generateToken } from "../config/token.js";

// logic for user signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ name, email, password: hashPassword });
        
        const token = generateToken({userId: result._id});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        
        return res.status(201).json({
            status: "success",
            message: "user created successfully",
            token: token
        });
    } catch (error) {
        if(error.code === 11000){
            return res.status(409).json({
                status: "error",
                message: `email ${error.keyValue.email} is already used with different account`
            })
        }else{
            return res.status(500).json({
                status: "error",
                message: error.message
            })
        }
    }
};

// logic for user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser){
            return res.status(404).json({
                status: "error",
                message: "email doesn't exists"
            })
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if(!match){
            return res.status(401).json({
                status: "error",
                message: "incorrect password"
            })
        }

        const token = generateToken(email);
        
        return res.status(200).json({
            status: "success",
            message: "login successfull",
            token: token
        })
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: error.message
        })
    }
};

// logic to update user details
const getUsers = (req, res) => {
    res.status(200).json(
        {
            status: "success",
            message: "I will give you data of all users"
        }
    );
};




const updateUser = (req, res) => {
    res.status(200).json(
        {
            status: "success",
            message: "I will update data of requested user"
        }
    );
};

const deleteUser = (req, res) => {
    res.status(200).json(
        {
            status: "success",
            message: "I will delete data of requested user"
        }
    );
};

export { login, getUsers, signup, deleteUser, updateUser };