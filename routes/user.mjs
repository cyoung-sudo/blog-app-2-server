import express from "express";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.mjs";

const userRoutes = express.Router();

userRoutes.route("/")
//----- Retrieve all users
.get((req, res) => {
  User.find({})
  .then(allDocs => {
    res.json({
      success: true,
      users: allDocs
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Create user
.post((req, res) => {
  // Encrypt password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    // Create user
    User.create({
      username: req.body.username,
      password: hash
    })
    .then(savedDoc => {
      res.json({
        success: true,
        user: savedDoc
      })
    })
    .catch(err => {
      let errorMsg = "An error has occured";
      if(err.code === 11000) {
        errorMsg = "Username has already been taken";
      }
      
      res.json({
        success: false,
        message: errorMsg
      });
    });
  });
});

userRoutes.route("/:id")
//----- Retrieve user
.get((req, res) => {
  User.findById(req.params.id)
  .then(doc => {
    res.json({
      success: true,
      user: doc
    });
  })
  .catch(err => {
    res.json({ success: false });
  });
})
//----- Delete user
.delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(deletedDoc => {
    res.json({ success: true });
  })
  .catch(err => {
    res.json({ success: false });
  });
});

export default userRoutes;