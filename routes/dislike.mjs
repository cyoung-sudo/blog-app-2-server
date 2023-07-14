import express from "express";
// Models
import Dislike from "../models/dislikeModel.mjs";

const dislikeRoutes = express.Router();

dislikeRoutes.route("/")
//----- Toggle dislike
.post((req, res) => {
  // Delete existing dislike
  Dislike.findOneAndDelete({
    userId: req.body.userId,
    postId: req.body.postId,
  })
  .then(deletedDoc => {
    // Check if dislike was deleted
    if(!deletedDoc) {
      // Create dislike
      Dislike.create({
        userId: req.body.userId,
        postId: req.body.postId,
      })
      .then(savedDoc => {
        res.json({ success: true });
      })
      .catch(err => console.log(err));
    } else {
      res.json({ success: true });
    }
  })
  .catch(err => console.log(err));
});

dislikeRoutes.route("/post/:id")
//----- Retrieve all post dislikes 
.get((req, res) => {
  Dislike.find({
    postId: req.params.id
  })
  .then(docs => {
    res.json({
      success: true,
      count: docs.length
    });
  })
  .catch(err => console.log(err));
})
//----- Delete all post dislikes
.delete((req, res) => {
  Dislike.deleteMany({
    postId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

export default dislikeRoutes;