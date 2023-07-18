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
      .catch(err => {
        res.json({ success: false });
      });
    } else {
      res.json({ success: true });
    }
  })
  .catch(err => {
    res.json({ success: false });
  });
});

dislikeRoutes.route("/post/:id")
//----- Retrieve all post dislikes 
.get((req, res) => {
  Dislike.find({
    postId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      count: allDocs.length
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Delete all post dislikes
.delete((req, res) => {
  Dislike.deleteMany({
    postId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

dislikeRoutes.route("/user/:id")
//----- Retrieve all user dislikes
.get((req, res) => {
  Dislike.find({
    userId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      dislikes: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Delete all user dislikes
.delete((req, res) => {
  Dislike.deleteMany({
    userId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

export default dislikeRoutes;