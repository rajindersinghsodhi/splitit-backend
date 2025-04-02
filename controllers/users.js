import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ name, email, password: hashPassword });
        if(result._id){
            return res.status(201).json(
                {
                    "status": "success",
                    "message": "user created successfully"
                }
            );
        }
    } catch (error) {
        if(error.code === 11000){
            return res.status(409).json(
                {
                    "status": "error",
                    "message": `email ${error.keyValue.email} is already used with different account`
                }
            )
        }else{
            return res.status(500).json(
                {
                    "status": "error",
                    "message": error
                }
            )
        }
    }
};

const getUsers = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will give you data of all users"
        }
    );
};

const getUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will give you data of requested user"
        }
    );
};



const updateUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will update data of requested user"
        }
    );
};

const deleteUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will delete data of requested user"
        }
    );
};

export { getUser, getUsers, addUser, deleteUser, updateUser };