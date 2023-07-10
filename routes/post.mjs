import express from "express";
// Models
import Post from "../models/postModel.mjs";

const postRoutes = express.Router();

postRoutes.route("/")
//----- Retrieve all posts
.get((req, res) => {
  Post.find({})
  .then(allDocs => {
    res.json({
      success: true,
      posts: allDocs
    });
  })
  .catch(err => console.log(err));
})
//----- Create post
.post((req, res) => {
  Post.create({
    userId: req.body.userId,
    title: req.body.title,
    desc: req.body.desc
  })
  .then(savedDoc => {
    res.json({
      success: true,
      post: savedDoc
    });
  })
  .catch(err => console.log(err));
});

postRoutes.route("/user/:id")
//----- Retrieve all user posts
.get((req, res) => {
  Post.find({
    userId: req.params.id
  })
  .then(allDocs => {
    res.json({
      success: true,
      posts: allDocs
    });
  })
  .catch(err => console.log(err));
})

export default postRoutes;