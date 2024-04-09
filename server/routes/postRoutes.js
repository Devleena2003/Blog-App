const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", requireSignIn, createPostController);
router.get("/get-all-posts", getAllPostsController);

module.exports = router;
