import express from "express";
// Models
import Follow from "../models/followModel.mjs";

const followRoutes = express.Router();

followRoutes.route("/")
//----- Toggle follow
.post((req, res) => {
  // Delete existing follow
  Follow.findOneAndDelete({
    followerId: req.body.followerId,
    followedId: req.body.followedId
  })
  .then(deletedDoc => {
    // Check if follow was deleted
    if(!deletedDoc) {
      // Create follow
      Follow.create({
        followerId: req.body.followerId,
        followedId: req.body.followedId
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

followRoutes.route("/follower/:id")
//----- Retrieve all user follows
.get((req, res) => {
  Follow.find({
    followerId: req.params.id
  })
  .then(docs => {
    res.json({
      success: true,
      followed: docs
    });
  })
  .catch(err => console.log(err));
});

followRoutes.route("/followed/:id")
//----- Retrieve all user followers
.get((req, res) => {
  Follow.find({
    followedId: req.params.id
  })
  .then(docs => {
    res.json({
      success: true,
      followers: docs
    });
  })
  .catch(err => console.log(err));
});

followRoutes.route("/user/:id")
//----- Delete all user follows & followers
.delete((req, res) => {
  Follow.deleteMany({
    $or: [
      {
        followerId: req.params.id
      },
      {
        followedId: req.params.id
      }
    ]
  })
  .then(deleteCount => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

export default followRoutes;