const foodcsv = require("../models/foodcsv");
const exceljs = require('exceljs');

module.exports.getfood = async (req, res) => {
  try {
    const detail = await foodcsv.find({}).select("name FoodGroup Calories");
    if (!detail) {
      return res.status(400).json({ message: "not found!!!!" });
    }
    return res.status(200).json({ message: detail });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


module.exports.postFoodCsv = async(req,res)=>{
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const workbook = new exceljs.Workbook();
  const buffer = req.file.buffer;

  try {
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);

    // Iterate through rows and save data to MongoDB
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      // Extract data from each row and create a new document
      const id =parseFloat( row.getCell(1).value);  // Assuming name is in the first column
  const name = row.getCell(2).value;   // Assuming age is in the second column
  const foodgroup = row.getCell(3).value; // Assuming email is in the third column
  const calories = parseFloat(row.getCell(4).value);
  const fat = parseFloat(row.getCell(5).value);
  const protein = parseFloat(row.getCell(6).value);
  const carbohydrate = parseFloat(row.getCell(7).value);
  const servingCell = row.getCell(8).value;
  // const servingValue = parseFloat(servingCell.replace(/[^\d.]/g, '')); 
  // if (servingCell !== null) {
  //   const servingValue = parseFloat(servingCell.replace(/[^\d.]/g, ''));
  const servingValue = servingCell !== null ? parseFloat(servingCell.replace(/[^\d.]/g, '')) : null;

  if (!isNaN(id) && !isNaN(calories) && !isNaN(fat) && !isNaN(protein) && !isNaN(carbohydrate) && !isNaN(servingValue)) {
        // const servingValue = servingCell !== null ? parseFloat(servingCell.replace(/[^\d.]/g, '')) : null
        const rowData = {
        // Map Excel columns to your schema fields
        ID:id,
        name:name,
        FoodGroup:foodgroup,
        Calories:calories,
        Fat:fat,
        Protein:protein,
        Carbohydrate:carbohydrate,
        Serving:servingValue
        }
        const newData = new foodcsv(rowData);
        await newData.save();
      };
    
    });

    res.status(200).json({ message: 'File uploaded and data saved'});
  } catch (error) {
    console.error('Error processing Excel file:', error);
    res.status(500).json({ message: 'Error processing Excel file' });
  }
}

















// module.exports.getfoodreg = async (req, res) => {
//   try {
//     const searchTerm = req.query.keyword;
//     console.log(searchTerm);
//     let regex = new RegExp('^'+searchTerm, "i");
//     console.log(regex);
//     let searchfood = await foodcsv
//       .find({ name: { $regex: regex } })
//       .sort({ name: 1 });
//     res.json(searchfood);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };