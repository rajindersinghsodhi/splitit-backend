import { response } from "express";
import { Todo } from "../models/todo.js";

const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const userId = req.user._id;

        if(!title){
            return res.status(400).json({
                status: "error",
                message: "title is required"
            })
        }

        const result = await Todo.create({ title, description, dueDate, user: userId });

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
        const userId = req.user._id;

        const todosData = await Todo.find({ user: userId });

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

const getTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user._id;

        const todoData = await Todo.findOne({ _id: todoId, user: userId });

        if(!todoData){
            return res.status(404).json({
                status: "error",
                message: "todo not found"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "todo fetched successfully",
            todoData: todoData
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error in fetching todo",
            error: error.message
        })
    }
}

const updateTodo = async (req, res) => {
    try {
        const updateData = req.body;
        const todoId = req.params.todoId;
        const userId = req.user._id;

        const todoData = await Todo.findOneAndUpdate({ _id: todoId, user: userId }, updateData, {new: true});

        if(!todoData){
            return res.status(404).json({
                status: "error",
                message: "todo not found"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "todo updated successfully",
            todoData: todoData
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error in updating todo",
            error: error.message
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.user._id;

        const result = await Todo.findOneAndDelete({ _id: todoId, user: userId});

        if(!result){
            return res.status(404).json({
                status: "error",
                message: "todo not found"
            })
        }
        
        return res.status(200).json({
            status: "success",
            message: "todo deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error in deleting todo",
            error: error.message
        })
    }
}

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };