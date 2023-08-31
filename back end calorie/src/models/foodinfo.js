const mongoose = require("mongoose");
const { Schema } = mongoose;
const foodSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    foodname: {
      type: String,
      required: true,
    },
    mealtype: {
      type: String,
      required: true,
    },
    foodgroup: {
      type: String,
      required: true,
    },
    serving: {
      type: Number,
      required: true,
    },
    calIn: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Food = new mongoose.model("foodData", foodSchema);
module.exports = Food;
