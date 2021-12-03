const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    type: {
      type: String,
      enum: {
        required: true,
        values: ["like", "heart", "care", "laugh", "angry", "sad"],
        message: "{VALUE} is not supported",
      },
    },
    reactionableType: {
      type: String,
      enum: {
        required: true,
        values: ["Post", "Comment", "Photo", "Message"],
        message: "{VALUE} is not supported",
      },
    },
    reactionableId: {
      required: true,
      type: Schema.Types.ObjectId,
      refPath:"reactionableType"
    },
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

reactionSchema.statics.calculateReaction = async function (
  reactionableId,
  reactionableType
) {
  const reaction = await Reaction.aggregate([
    {
      $match: { reactionableId: reactionableId },
    },
    {
      $group: {
        _id: "$reactionableId",
        laugh: {
          $sum: {
            $cond: [{ $eq: ["$type", "laugh"] }, 1, 0],
          },
        },
        sad: {
          $sum: {
            $cond: [{ $eq: ["$type", "sad"] }, 1, 0],
          },
        },
        like: {
          $sum: {
            $cond: [{ $eq: ["$type", "like"] }, 1, 0],
          },
        },
        heart: {
          $sum: {
            $cond: [{ $eq: ["$type", "heart"] }, 1, 0],
          },
        },
        angry: {
          $sum: {
            $cond: [{ $eq: ["$type", "angry"] }, 1, 0],
          },
        },
        care: {
          $sum: {
            $cond: [{ $eq: ["$type", "care"] }, 1, 0],
          },
        },
      },
    },
  ]);
  
  await mongoose.model(reactionableType).findByIdAndUpdate(reactionableId, {
    reactions: {
      laugh: (reaction[0] && reaction[0].laugh) || 0,
      sad: (reaction[0] && reaction[0].sad) || 0,
      heart: (reaction[0] && reaction[0].heart) || 0,
      like: (reaction[0] && reaction[0].like) || 0,
      angry: (reaction[0] && reaction[0].angry) || 0,
      care: (reaction[0] && reaction[0].care) || 0,
    },
  });
};

reactionSchema.post("save", function () {
  // this point to current review
  this.constructor.calculateReaction(this.reactionableId, this.reactionableType);
});

reactionSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reactionSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReaction(
    this.doc.reactionableId,
    this.doc.reactionableType
  );
});

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
