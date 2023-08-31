const express = require("express");
const {
  postUser,
  getUserDetail,
  calculateCalories,
  CaloriesDetail,
  userDelete
} = require("../controller/usercntrl");

const userRoute = express.Router();

userRoute.post("/add", postUser);
userRoute.get("/get", getUserDetail);
userRoute.post("/", calculateCalories),
  userRoute.get("/calorie/:userId", CaloriesDetail);
  userRoute.delete("/delete/:userId",userDelete)

module.exports = userRoute;
