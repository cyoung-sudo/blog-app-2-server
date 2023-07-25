import mongoose from "mongoose";
// Models
import Like from "./likeModel.mjs";
import Dislike from "./dislikeModel.mjs";
import Comment from "./commentModel.mjs";

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Middleware for "findOneAndDelete"
// (can't use arrow-function for "this" to work)
PostSchema.pre("findOneAndDelete", function() {
  // Delete all post likes
  return Like.deleteMany({ postId: this.getFilter()._id })
    .then(() => {
      // Delete all post dislikes
      return Dislike.deleteMany({ postId: this.getFilter()._id });
    })
    .then(() => {
      // Delete all post comments
      return Comment.deleteMany({ postId: this.getFilter()._id });
    })
    .then(() => {})
    .catch(err => console.log(err));
});

const postModel = mongoose.model("Post", PostSchema);

export default postModel;