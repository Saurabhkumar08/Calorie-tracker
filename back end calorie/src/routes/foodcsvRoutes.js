const express = require("express");
const multer = require("multer");
const user = express();
const {
  postFoodCsv,
  getfood,
} = require("../controller/foodcsvcntrl");

const storage = multer.memoryStorage();
const upload= multer({storage:storage});

user.post("/importUser", upload.single("file"), postFoodCsv);
user.get("/get", getfood),

module.exports = user;
