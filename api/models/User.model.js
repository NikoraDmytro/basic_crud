import mongoose, { Schema } from "mongoose";
import { validateBirthDate } from "../utils/validateBirthDate.js";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "User first name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "User last name is required!"],
  },
  dateOfBirthday: {
    type: Date,
    required: [true, "User date of birthday is required!"],
    validate: {
      validator: validateBirthDate,
      message: "User must be between 18 and 100 years old!",
    },
  },
  avatarUrl: String,
  residence: { type: String, required: [true, "User residence is required!"] },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
