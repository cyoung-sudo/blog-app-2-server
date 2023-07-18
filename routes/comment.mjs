import express from "express";
// Models
import Comment from "../models/commentModel.mjs";

const commentRoutes = express.Router();

commentRoutes.route("/")
//----- Create comment
.post((req, res) => {
  Comment.create({
    userId: req.body.userId,
    postId: req.body.postId,
    text: req.body.text
  })
  .then(savedDoc => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

commentRoutes.route("/post/:id")
//----- Retrieve all post comments
.get((req, res) => {
  Comment.find({
    postId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      comments: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Delete all post comments
.delete((req, res) => {
  Comment.deleteMany({
    postId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

commentRoutes.route("/user/:id")
//----- Delete all user comments
.delete((req, res) => {
  Comment.deleteMany({
    userId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

export default commentRoutes;