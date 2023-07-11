import mongoose from "mongoose";

const DislikeSchema = new mongoose.Schema({
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

// Only 1 dislike per user on given post
DislikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const dislikeModel = mongoose.model("Dislike", DislikeSchema);

export default dislikeModel;