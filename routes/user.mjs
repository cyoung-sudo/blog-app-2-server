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
  .catch(err => console.log(err));
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
      let errorMsg = "An error has occurred";
      if(err.code === 1100) {
        errorMsg = "Username has already been taken";
      }
      
      res.json({
        success: false,
        message: errorMsg
      })
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
  .catch(err => console.log(err));
});

export default userRoutes;