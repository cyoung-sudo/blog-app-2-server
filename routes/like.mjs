import express from "express";
// Models
import Like from "../models/likeModel.mjs";

const likeRoutes = express.Router();

likeRoutes.route("/")
//----- Toggle like
.post((req, res) => {
  // Delete existing like
  Like.findOneAndDelete({
    userId: req.body.userId,
    postId: req.body.postId,
  })
  .then(deletedDoc => {
    // Check if like was deleted
    if(!deletedDoc) {
      // Create like
      Like.create({
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

likeRoutes.route("/post/:id")
//----- Retrieve all post likes 
.get((req, res) => {
  Like.find({
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
//----- Delete all post likes
.delete((req, res) => {
  Like.deleteMany({
    postId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

likeRoutes.route("/user/:id")
//----- Retrieve all user likes
.get((req, res) => {
  Like.find({
    userId: req.params.id
  })
  .then(allDocs => {
    res.json({ 
      success: true,
      likes: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Delete all user likes
.delete((req, res) => {
  Like.deleteMany({
    userId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

export default likeRoutes;