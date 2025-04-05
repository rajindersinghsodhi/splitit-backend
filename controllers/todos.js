import { Todo } from "../models/todo.js";

const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if(!title){
            return res.status(400).json({
                status: "error",
                message: "title is required"
            })
        }

        const result = await Todo.create({ title, description, dueDate });

        return res.status(201).json({
            status: "success",
            message: "Todo created successfully",
            todo: result
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Unable to create todo",
            error: error.message
        })
    }
}

const getTodos = async (req, res) => {
    try {
        const todosData = await Todo.find({});

        if(todosData.length === 0){
            return res.status(200).json({
                status: "success",
                message: "no todos available",
                todosData: todosData
            })
        }
        return res.status(200).json({
            status: "success",
            message: "todos fetched successfully",
            todosData: todosData 
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error in fetching todos",
            error: error.message
        })
    }
}

export { createTodo, getTodos };