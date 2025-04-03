import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { createToken } from "../config/token.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ name, email, password: hashPassword });
        
        if(result._id){
            const jwtPayload = { 
                "userId": result._id, 
                "email": email 
            }
            
            const token = createToken(jwtPayload);
            
            return res.status(201).json(
                {
                    "status": "success",
                    "message": "user created successfully",
                    "token": token
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

const login = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    
    if(existingUser){
        const match = await bcrypt.compare(password, existingUser.password);
        if(match){
            return res.status(200).json(
                {
                    "status": "success",
                    "message": "login successfull"
                }
            )
        }else{
            return res.status(401).json(
                {
                    "status": "error",
                    "message": "incorrect password"
                }
            )
        }
    }else{
        return res.status(404).json(
            {
                "status": "error",
                "message": "email doesn't exists"
            }
        )
    }
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

export { login, getUsers, createUser, deleteUser, updateUser };