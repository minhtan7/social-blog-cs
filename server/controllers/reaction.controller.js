const Comment = require("../models/Comment");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const Reaction = require("../models/Reaction");


const reactionsController = {};

reactionsController.create = catchAsync(async (req, res, next) => {
  const { reactionableType, reactionableId, emoji } = req.body;
    //reactionableType: "Post"
    // reactionableId: "fdfdsfds"

  const targetObj = await mongoose.model(reactionableType).findById(reactionableId);
  if (!targetObj)
    return next(
      new AppError(404, `${reactionableType} not found`, "Create Reaction Error")
    );

  // Find the reaction of the current user
  let reaction = await Reaction.findOne({
    reactionableType,
    reactionableId,
    owner: req.userId,
  });
  console.log('reaction', reaction)
  let message = "";
  if (!reaction) {
    await Reaction.create({ reactionableType, reactionableId, owner: req.userId, type:emoji });
    message = "Added reaction";
    
  } else {
    if (reaction.emoji === emoji) {
      await Reaction.findOneAndDelete({ _id: reaction._id });
      message = "Removed reaction";
    } else {
      await Reaction.findOneAndUpdate({ _id: reaction._id }, { type: emoji });
      message = "Updated reaction";
    }
  }
  // Get the updated number of reactions in the reactionableType
  const reactionStat = await mongoose
    .model(reactionableType)
    .findById(reactionableId, "reactions");
    console.log(reactionStat)
  return sendResponse(res, 200, true, reactionStat.reactions, null, message);
});



module.exports = reactionsController;
