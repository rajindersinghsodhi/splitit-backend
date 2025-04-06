import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
}, { timestamps: true });

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

const User = mongoose.model("User", userSchema);

export { User };