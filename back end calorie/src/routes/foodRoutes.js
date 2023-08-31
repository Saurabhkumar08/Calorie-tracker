const express = require("express");
const { postFoodDetail } = require("../controller/foodcntrl");

const foodRoute = express.Router();

foodRoute.post("/add", postFoodDetail);

module.exports = foodRoute;
