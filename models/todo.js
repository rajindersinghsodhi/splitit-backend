import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema);

export {Todo};