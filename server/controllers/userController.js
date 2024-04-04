const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password is required",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel({ name, email, password }).save();
    return res.status(200).send({
      success: true,
      message: "registration successfull",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "error in register api",
      e,
    });
  }
};
module.exports = { registerController };
