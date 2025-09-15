import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ✅ remove unique
  email: { type: String, required: true, unique: true }, // ✅ only email is unique
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export default User;
