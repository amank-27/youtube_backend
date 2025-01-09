import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userId: { type: String  },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store hashed password
    avatar: { type: String, required: true },
    channels: [{ type: String }]  // channel IDs the user is associated with
});

// Create a user model
const User = mongoose.model("User", userSchema);

export default User;
