const bcrypt = require("bcryptjs");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");

const userController = {};

userController.create = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    email,
    password,
  });
  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
})

userController.readUser = async (req, res) => {
  const {displayName} = req.params

  const user = await User.findOne({ displayName }).lean();
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Single User"
  );
  }
};

userController.readCurrentUser = async (req, res) => {
  const userId = req.userId
  const user = await User.findById(userId).lean();
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get User me"
  );
  }
};

userController.update = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, user) => {
      console.log({ err, user });
      if (!user) {
        res.status(404).json({ message: "User not Found" });
      } else {
        res.json(user);
      }
    }
  );
};

userController.destroy = async (req, res) => {
  await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res.json(user);
    }
  });
};

module.exports = userController;
