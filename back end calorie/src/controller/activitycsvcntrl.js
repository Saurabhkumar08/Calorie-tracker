const activityCsv = require("../models/activitycsv");
const exceljs = require('exceljs');


module.exports.getactivity = async (req, res) => {
  try {
    const activity = await activityCsv.find({});
    if (!activity) {
      return res.status(400).json({ message: "no activities found" });
    }
    return res.status(200).json({ message: activity });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.postactivitycsv=async (req, res) => {
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
      const activity = row.getCell(1).value;  // Assuming name is in the first column
  const specificmotion = row.getCell(2).value;   // Assuming age is in the second column
  const met = row.getCell(3).value; // Assuming email is in the third column
  if (!isNaN(met)) {
        const rowData = {
        // Map Excel columns to your schema fields
        ACTIVITY:activity,
        SPECIFICMOTION:specificmotion,
        METs:met,
        }
        const newData = new activityCsv(rowData);
        await newData.save();
      };

    });

    res.status(200).json({ message: 'File uploaded and data saved'});
  } catch (error) {
    console.error('Error processing Excel file:', error);
    res.status(500).json({ message: 'Error processing Excel file' });
  }
}
