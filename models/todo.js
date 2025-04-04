import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    dueDate: {type: Date}
}, {timestamps: true})

const Todo = mongoose.model("Todo", todoSchema);

export {Todo};