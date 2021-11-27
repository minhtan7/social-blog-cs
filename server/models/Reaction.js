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

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
