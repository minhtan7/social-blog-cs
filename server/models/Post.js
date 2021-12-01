const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = Schema(
  {
    body: { type: String, unique: false, default: "" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    imageUrl: {type: String, default:"https://i.picsum.photos/id/244/600/600.jpg?hmac=OeAzRT1ePNH0wsvaO680ILDE0pSs4gc0l9phxsXicnc"}
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
