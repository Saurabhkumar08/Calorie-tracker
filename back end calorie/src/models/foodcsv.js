const mongoose = require("mongoose");
const usercsv = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  FoodGroup: {
    type: String,
    required: true,
  },
  Calories: {
    type: Number,
    required: true,
  },
  Fat: {
    type: Number,
    required: true,
  },
  Protein: {
    type: Number,
    required: true,
  },
  Carbohydrate: {
    type: Number,
    required: true,
  },
  Serving: {
    type: Number,
    required: false,
    default:null,
  },
});

const foodcsv = new mongoose.model("foodcsv", usercsv);
module.exports = foodcsv;
