const Comment = require("../models/Comment");

// We don't use AppError & sendResponse in this controller.
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Post = require("../models/Post");


const commentsController = {};

commentsController.create = catchAsync(async (req, res) => {
  const {body, postId} = req.body
  const userId = req.userId
  const comment = await Comment.create({
    owner: userId,
    body: body,
    post: postId,
  });

  // Here we'd need to update the post as well.
  

  return sendResponse(
    res,
    200,
    true,
    comment,
    null,
    "New comment created"
  );
});

commentsController.read = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id }).populate(
    "owner"
  );
  if (!comment) {
    res.status(404).json({ message: "Comment not found." });
  } else {
    return sendResponse(
    res,
    200,
    true,
    comment,
    null,
    "Get Single Comment"
  );
  }
};

commentsController.update = async (req, res) => {
  await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, comment) => {
      console.log({ err, comment });
      if (!comment) {
        res.status(404).json({ message: "Comment not found." });
      } else {
        res.json(comment);
      }
    }
  );
};

commentsController.destroy = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
    } else {
      res.json(comment);
    }
  });
};

commentsController.list = async (req, res) => {
  await Comment.find({}, (err, comments) => {
    if (!comments) {
      res.status(404).json({ message: "Comments not found." });
    } else {
      res.json(comments);
    }
  });
};

module.exports = commentsController;
