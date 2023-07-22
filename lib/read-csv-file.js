const csv = require('csvtojson');

const readCSVFile = async (filePath) => {
  try {
    const jsonData = [];
    await csv()
      .fromFile(filePath)
      .subscribe((jsonObj) => {
        jsonData.push(jsonObj);
      });
    return jsonData;
  } catch (error) {
    console.error(`Error occurred while reading ${filePath} CSV file:`);
    throw error;
  }
};

module.exports = readCSVFile;
