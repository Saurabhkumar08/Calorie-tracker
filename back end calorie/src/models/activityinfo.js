const mongoose = require("mongoose");
const { Schema } = mongoose;
const activityinfo = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
  activityName: {
    type: String,
    required: true,
  },
  activityDesc: {
    type: String,
  },
  metvalue: {
    type: Number,
    required: true,
  },
  activityDuration: {
    type: String,
    required: true,
  },
  calOut: {
    type: Number,
    required: true,
  },
});

const activityInfo = new mongoose.model("activityinfo", activityinfo);
module.exports = activityInfo;
