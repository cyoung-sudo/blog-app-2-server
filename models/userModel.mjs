import mongoose from "mongoose";
// Models
import Post from "./postModel.mjs";
import Like from "./likeModel.mjs";
import Dislike from "./dislikeModel.mjs";
import Comment from "./commentModel.mjs";
import Follow from "./followModel.mjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Middleware for "findOneAndDelete"
// (can't use arrow-function for "this" to work)
UserSchema.pre("findOneAndDelete", function() {
  // Find all user posts
  return Post.find({ userId: this.getFilter()._id })
    .then(allDocs => {
      let promises = allDocs.map(doc => {
        return Post.findByIdAndDelete(doc._id);
      });
      // Delete all user posts "individually"
      // (use "findByIdAndDelete" to trigger post-middleware)
      // (gives post-middleware access to deleted doc)
      return Promise.all(promises);
    })
    .then(() => {
      // Delete all user likes
      return Like.deleteMany({ userId: this.getFilter()._id });
    })
    .then(() => {
      // Delete all user dislikes
      return Dislike.deleteMany({ userId: this.getFilter()._id });
    })
    .then(() => {
      // Delete all user comments
      return Comment.deleteMany({ userId: this.getFilter()._id });
    })
    .then(() => {
      // Delete all user-related follows
      return Follow.deleteMany({
        $or: [
          {
            followerId: this.getFilter()._id
          },
          {
            followedId: this.getFilter()._id
          }
        ]
      });
    })
    .then(() => {})
    .catch(err => console.log(err));
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;