const mongoose = require("mongoose");
const activitycsv = new mongoose.Schema({
  ACTIVITY: {
    type: String,
    required: true,
  },
  SPECIFICMOTION: {
    type: String,
    required: true,
  },
  METs: {
    type: Number,
    required: true,
  },
});

const activityCsv = new mongoose.model("activitycsv", activitycsv);
module.exports = activityCsv;
