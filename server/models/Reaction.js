const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    // What type of reaction did we have?
    // https://mongoosejs.com/docs/validation.html
    type: {
      type: String,
      enum: {
        required: true,
        values: ["Like", "Heart", "Care", "Laugh", "Angry", "Sad"],
        message: "{VALUE} is not supported",
      },
    },

    // What is the id of the thing we reacted to?
    reactionableId: {
      required: true,
      type: Schema.Types.ObjectId,
    },

    // What did we react to?
    reactionableType: {
      type: String,
      enum: {
        required: true,
        values: ["Post", "Comment", "Photo", "Message"],
        message: "{VALUE} is not supported",
      },
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
  const stats = await this.aggregate([
    {
      $match: { target: reactionableId },
    },
    {
      $group: {
        _id: "$target",
        laugh: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "laugh"] }, 1, 0],
          },
        },
        sad: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "sad"] }, 1, 0],
          },
        },
        like: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "like"] }, 1, 0],
          },
        },
        love: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "love"] }, 1, 0],
          },
        },
        angry: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "angry"] }, 1, 0],
          },
        },
      },
    },
  ]);
  await mongoose.model(reactionableType).findByIdAndUpdate(reactionableId, {
    reactions: {
      laugh: (stats[0] && stats[0].laugh) || 0,
      sad: (stats[0] && stats[0].sad) || 0,
      love: (stats[0] && stats[0].love) || 0,
      like: (stats[0] && stats[0].like) || 0,
      angry: (stats[0] && stats[0].angry) || 0,
    },
  });
};

reactionSchema.post("save", function () {
  // this point to current review
  this.constructor.calculateReaction(this.target, this.targetType);
});

reactionSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reactionSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReaction(
    this.doc.target,
    this.doc.targetType
  );
});

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
