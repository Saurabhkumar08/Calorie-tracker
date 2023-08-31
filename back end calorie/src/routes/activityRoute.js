const express = require("express");
const { postactivityinfo } = require("../controller/activityinfo");

const activityroute = express.Router();

activityroute.post("/add", postactivityinfo);

module.exports = activityroute;
