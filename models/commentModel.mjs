import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;