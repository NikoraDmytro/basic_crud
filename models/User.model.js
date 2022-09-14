import mongoose, { Schema } from "mongoose";
import { validateBirthDate } from "../utils/validateBirthDate.js";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirthday: {
    type: Date,
    required: true,
    validate: {
      validator: validateBirthDate,
      message: "User must be between 18 and 100 years old!",
    },
  },
  avatarUrl: String,
  residence: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
