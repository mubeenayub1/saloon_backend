import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
  },

  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  password: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "blocked"],
    default: "pending",
  },
});

// const Customer = mongoose.model('Customer', customerSchema);
export const User = mongoose.model("User", userSchema);
