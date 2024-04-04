const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (e) {
    console.log(` error in db connection ${e}`.bgRed.white);
  }
};
module.exports = connectDB;
