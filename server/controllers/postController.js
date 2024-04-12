const postModel = require("../models/postModel");

//create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post APi",
      error,
    });
  }
};

//get all posts
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All posts data",
      posts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in api",
    });
  }
};
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "your post is successfully deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      e,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: req.params.id });

    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "No title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "updated successfully",
      updatedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in update api",
      err,
    });
  }
};
module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
