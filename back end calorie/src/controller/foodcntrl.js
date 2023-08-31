const Food = require("../models/foodinfo");
const foodcsv = require("../models/foodcsv");

module.exports.postFoodDetail = async (req, res) => {
  try {
    const { userId, date, foodname, mealtype, foodgroup, serving } = req.body;
    if (!userId || !date || !foodname || !mealtype || !foodgroup || !serving) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const foodCsvData = await foodcsv.findOne({ name: foodname });

    if (!foodCsvData) {
      return res.status(404).json({ message: "Food data not found in CSV" });
    }

    const calIn = foodCsvData.Calories * serving;

    const food = await Food.create({
      userId,
      date,
      foodname,
      mealtype,
      foodgroup,
      serving,
      calIn: calIn, 
    });
    return res.status(200).json({ message: "food created", food });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
