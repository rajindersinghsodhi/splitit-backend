import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { generateToken } from "../config/token.js";
import { Todo } from "../models/todo.js";

// logic for user signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const userData = await User.create({ name, email, password: hashPassword });
        
        const token = generateToken({userId: userData._id});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        
        return res.status(201).json({
            status: "success",
            message: "user created successfully",
            user: userData,
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
                message: "unable to create account",
                error: error.message
            })
        }
    }
};

// logic for user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email }).select("+password");

        if(!userData){
            return res.status(404).json({
                status: "error",
                message: "email doesn't exists"
            })
        }

        const match = await bcrypt.compare(password, userData.password);

        if(!match){
            return res.status(401).json({
                status: "error",
                message: "incorrect password"
            })
        }
        
        const token = generateToken({userId: userData._id});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            status: "success",
            message: "login successfull",
            user: userData,
            token: token
        })
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "unable to login user",
            error: error.message
        })
    }
};

const updateUser = async (req, res) => {
    try {
        const updateData = req.body;
        const userIdThroughParams = req.params.userId;
        const userIdThroughJwt = req.user._id.toString();

        if(userIdThroughParams != userIdThroughJwt){
            return res.status(401).json({
                status: "error",
                message: "you are not authorized to update this account"
            })
        }

        const updatedUser = await User.findOneAndUpdate({_id: userIdThroughJwt}, updateData, {new: true});

        return res.status(200).json({
            status: "success",
            message: "user updated successfully",
            user: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "unable to update user details",
            error: error.message
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const userIdThroughParams = req.params.userId;
        const userIdThroughJwt = req.user._id.toString();

        if(userIdThroughParams != userIdThroughJwt){
            return res.status(401).json({
                status: "error",
                message: "you are not authorized to delete this account"
            })
        }
        
        const deletedUser = await User.findOneAndDelete({_id: userIdThroughJwt});

        if(!deletedUser){
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }

        const deletedTodos = await Todo.deleteMany({ user: userIdThroughJwt });

        return res.status(200).json({
            status: "success",
            message: "user deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "unable to delete user",
            error: error.message
        })
    }
};

export { login, signup, deleteUser, updateUser };