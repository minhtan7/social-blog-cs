const Post = require("../models/Post");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Comment = require("../models/Comment");
const { populate } = require("../models/Post");

const postController = {};

postController.create = catchAsync(async (req, res) => {
  const {body, imageUrl} = req.body
  console.log(imageUrl)
  let post
  if(!imageUrl) {
    post = await Post.create({ owner: req.userId, body});
  } else {
    post = await Post.create({ owner: req.userId, body, imageUrl});
  }
  res.json(post);
});

postController.read = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  console.log(post)
  if (!post)
    return next(new AppError(404, "Post not found", "Get Single Post Error"));

  await post.populate("owner").populate("comments").execPopulate();
  // await post;

  res.json(post);
});

postController.update = catchAsync(async (req, res) => {
  await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, post) => {
      console.log({ err, post });
      if (!post) {
        res.status(404).json({ message: "Post not Found" });
      } else {
        res.json(post);
      }
    }
  );
});

postController.destroy = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).json({ message: "Post not Found" });
    } else {
      res.json(post);
    }
  });
});
//"/posts?page=4&limit=10&title[$regex]=noddle&title[$options]=i"
postController.list = catchAsync(async (req, res) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  //req.query = {page:1, limit: 10, title[$regex]: noddle, title[options]=i}

  //filter= {title[$regex]: noddle, title[options]:i}
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const totalPosts = await Post.countDocuments({ ...filter });
    const totalPages = Math.ceil(totalPosts / limit); //Math.floor
    const offset = limit * (page - 1);
    // limit =10, page = 2 => offset = 10
    const posts = await Post.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit).populate("owner").populate({path:"comments", populate:"owner"})
      // populate({path:"comments", populate:"owner"})
  return sendResponse(res, 200, true, { posts }, null, "Received posts");
});

postController.createComment = catchAsync(async (req, res) => {
  const {body } = req.body
  const {id} = req.params
  const userId = req.userId
  const comment = await Comment.create({
    body,
    owner: userId,
    post: id,
  });

  const post = await Post.findById(id);
  post.comments.push(comment._id);

  await post.save();
  await post.populate("comments");
  await post.execPopulate();
  return sendResponse(res, 200, true, { comment }, null, "Create comment");
});

module.exports = postController;
