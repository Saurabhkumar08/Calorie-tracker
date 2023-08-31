const express = require("express");
const multer = require("multer");
const useractivity = express();
const {
  postactivitycsv,
  getactivity,
} = require("../controller/activitycsvcntrl");

const storage = multer.memoryStorage();
const upload= multer({storage:storage});

useractivity.post("/upload",upload.single("file"),postactivitycsv)
useractivity.get("/get", getactivity);
module.exports = useractivity;
