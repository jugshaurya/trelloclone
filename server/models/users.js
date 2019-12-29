const mongoose = require("mongoose");
const attachUserHooks = require("../hooks/users.hooks");

// describe schema using mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String
    }
  },
  { timestamps: true }
);

// attaching hooks
attachUserHooks(userSchema);

const User = mongoose.model("users", userSchema);

module.exports = User;
