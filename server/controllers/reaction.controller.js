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
  const { reactionableType, reactionableId, type } = req.body; 
  //reactionableType: Post, reactionableId: abc, type: heart

//find the document with the id: reactionableId in the collections reactionableType
  const targetObj = await mongoose.model(reactionableType).findById(reactionableId);
  //targetObj = <post>

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

  //one user only can only have one reaction to a single post at a time

  let message = "";
  if (!reaction) {
    //there is no reaction just yet, create a new reaction
    await Reaction.create({ reactionableType, reactionableId, owner: req.userId, type });
    message = "Added reaction";

    
  } else {
    //there is a reaction from this user to this post, we're gonna check
    //if type of the old reaction === the type of reaction we send from the FE by now
    if (reaction.type === type) {
      await Reaction.findOneAndDelete({ _id: reaction._id });
      message = "Removed reaction";
      // => delete that reaction
    } else {
    //if type of the old reaction !== the type of reaction we send from the FE by now
      await Reaction.findOneAndUpdate({ _id: reaction._id }, { type: type });
      //update the type of the old reaction
      message = "Updated reaction";
    }
  }

  // Get the updated number of reactions in the reactionableType
  const reactionStat = await mongoose
    .model(reactionableType).findById(reactionableId)

  return sendResponse(res, 200, true, reactionStat.reactions, null, message);
  
});



module.exports = reactionsController;
