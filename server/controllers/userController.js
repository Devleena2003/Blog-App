const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
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

    const hashedPassword = await hashPassword(password);
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
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

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "provide email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      e,
    });
  }
};
module.exports = { loginController, registerController };
