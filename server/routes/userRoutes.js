const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update-user", requireSignIn, updateUserController);

module.exports = router;
