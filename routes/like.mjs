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
      .catch(err => console.log(err));
    } else {
      res.json({ success: true });
    }
  })
  .catch(err => console.log(err));
});

likeRoutes.route("/post/:id")
//----- Retrieve all post likes 
.get((req, res) => {
  Like.find({
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
//----- Delete all post likes
.delete((req, res) => {
  Like.deleteMany({
    postId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

likeRoutes.route("/user/:id")
//----- Delete all user likes
.delete((req, res) => {
  Like.deleteMany({
    userId: req.params.id
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

export default likeRoutes;