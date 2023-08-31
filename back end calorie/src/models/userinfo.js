const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    bmr: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
