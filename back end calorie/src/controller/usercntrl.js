const User = require("../models/userinfo");
const Food = require("../models/foodinfo");
const activityInfo = require("../models/activityinfo");
const foodcsv = require("../models/foodcsv");
const activityCsv = require("../models/activitycsv");

module.exports.postUser = async (req, res) => {
  try {
    const { name, weight, height, gender, age } = req.body;
    if (!name || !weight || !height || !gender || !age) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const bmr = (weight, height, gender, age) => {
      function calculateAge(age) {
        const currentDate = new Date();
        const birthDate = new Date(age);
        const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
        const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
        const daysDiff = currentDate.getDate() - birthDate.getDate();
        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
          return yearsDiff - 1;
        } else {
          return yearsDiff;
        }
      }
      const agee = calculateAge(age);
      if (gender === "Male") {
        return 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * agee;
      } else if (gender === "Female") {
        return 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * agee;
      }
    };
    let Totalbmr = bmr(weight, height, gender, age);
    const user = await User.create({
      name,
      weight,
      height,
      gender,
      age,
      bmr: parseFloat(Totalbmr.toFixed(2)),
    });
    return res.status(200).json({ user, message: "user created" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getUserDetail = async (req, res) => {
  try {
    const userDetail = await User.find({});
    if (!userDetail) {
      return res.status(400).json({
        message: "not registered till now",
      });
    }
    return res.status(200).json({
      message: "userfound",
      userDetail,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.CaloriesDetail = async (req, res) => {
  try {
    const userId = req.params.userId;
    const selectedDate = req.query.selectedDate;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const consumedFoods = await Food.find({
      userId: userId,
      date: selectedDate,
    });

    const activities = await activityInfo.find({
      userId: userId,
      date: selectedDate,
    });

    let CaloriesIn = 0;
    for (const food of consumedFoods) {
      const foodCsv = await foodcsv.findOne({ name: food.foodname });
      if (foodCsv) {
        CaloriesIn += foodCsv.Calories * food.serving;
      }
    }

    let CaloriesOut = 0;
    for (const activity of activities) {
      const activitycsv = await activityCsv.findOne({
        SPECIFICMOTION: activity.activityName,
      });
      if (activitycsv) {
        const durationInHours = activity.activityDuration / 60;
        CaloriesOut += activitycsv.METs * user.weight * durationInHours;
      }
    }

    const TotalCalories = CaloriesIn - user.bmr - CaloriesOut;

    const calorieData = {
      date: selectedDate,
      userId: userId,
      selectedDate: selectedDate,
      CaloriesIn: CaloriesIn,
      CaloriesOut: CaloriesOut,
      TotalCalories: TotalCalories,
      activities: activities,
      consumedFoods: consumedFoods,
      user: user,
    };

    res.status(200).json(calorieData);
  } catch (error) {
    console.error("Error calculating calories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.calculateCalories = async (req, res) => {
  try {
    const userId = req && req.body && req.body.userId;
    const selectedDate =
      req && req.body && req.body.date ? req.body.date : null;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const consumedFoods = selectedDate
      ? await Food.find({ userId: userId, date: selectedDate })
      : await Food.find({ userId: userId });

    const foodsByDate = {};
    for (const food of consumedFoods) {
      if (!foodsByDate[food.date]) {
        foodsByDate[food.date] = [];
      }
      foodsByDate[food.date].push(food);
    }

    const activities = selectedDate
      ? await activityInfo.find({ userId: userId, date: selectedDate })
      : await activityInfo.find({ userId: userId });

    const activitiesByDate = {};
    for (const activity of activities) {
      if (!activitiesByDate[activity.date]) {
        activitiesByDate[activity.date] = [];
      }
      activitiesByDate[activity.date].push(activity);
    }

    const dateCalorieData = [];
    dateCalorieData.push({
      user: user,
      consumedFoods: consumedFoods,
      activities: activitiesByDate,
    });
    const allDates = new Set([
      ...Object.keys(foodsByDate),
      ...Object.keys(activitiesByDate),
    ]);

    for (const date of allDates) {
      const foodsForDate = foodsByDate[date] || [];
      let CaloriesIn = 0;
      for (const food of foodsForDate) {
        const foodCsv = await foodcsv.findOne({ name: food.foodname });
        if (foodCsv) {
          CaloriesIn += foodCsv.Calories * food.serving;
        }
      }

      const activitiesForDate = activitiesByDate[date] || [];
      let CaloriesOut = 0;
      for (const activity of activitiesForDate) {
        const activitycsv = await activityCsv.findOne({
          SPECIFICMOTION: activity.activityName,
        });
        if (activitycsv) {
          const durationInHours = activity.activityDuration / 60;
          CaloriesOut += activitycsv.METs * user.weight * durationInHours;
        }
      }

      const TotalCalories = CaloriesIn - user.bmr - CaloriesOut;
      dateCalorieData.push({
        date: date,
        CaloriesIn: CaloriesIn,
        CaloriesOut: CaloriesOut,
        TotalCalories: TotalCalories,
      });
    }

    res.status(200).json(dateCalorieData);
  } catch (error) {
    console.error("Error calculating calories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.userDelete = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


