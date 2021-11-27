const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    body: { type: String, unique: false, default: "" },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
    post: { ref: "Post", required: true, type: Schema.Types.ObjectId },
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

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment
