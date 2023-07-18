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

followRoutes.route("/follower/:id")
//----- Retrieve all user follows
.get((req, res) => {
  Follow.find({
    followerId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      followed: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

followRoutes.route("/followed/:id")
//----- Retrieve all user followers
.get((req, res) => {
  Follow.find({
    followedId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      followers: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
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
  .catch(err => {
    res.json({ success: false });
  });
});

export default followRoutes;