import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
}, { timestamps: true });

// Only 1 like per user on given post
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const likeModel = mongoose.model("Like", LikeSchema);

export default likeModel;