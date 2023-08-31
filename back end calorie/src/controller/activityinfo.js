const activityInfo = require("../models/activityinfo");
const activityCsv = require("../models/activitycsv");
const User = require("../models/userinfo");

module.exports.postactivityinfo = async (req, res) => {
  try {
    const {
      userId,
      date,
      activityName,
      activityDesc,
      metvalue,
      activityDuration,
    } = req.body;
    if (
      !userId ||
      !date ||
      !activityName ||
      !activityDesc ||
      !metvalue ||
      !activityDuration
    ) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const activitycsv = await activityCsv.findOne({
      SPECIFICMOTION: activityName,
    });
    if (!activitycsv) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const durationInHours = activityDuration / 60;
    const calOut = activitycsv.METs * user.weight * durationInHours;

    const activity = await activityInfo.create({
      userId,
      date,
      activityName,
      activityDesc,
      metvalue,
      activityDuration,
      calOut: calOut, 
    });
    return res.status(200).json({ message: "activity created", activity });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
