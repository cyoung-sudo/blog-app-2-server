import express from "express";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.mjs";

const userRoutes = express.Router();

userRoutes.route("/")
//----- Create new user
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
    .catch(e => {
      let errorMsg = "An error has occurred";
      if(e.code === 1100) {
        errorMsg = "Username has already been taken";
      }
      
      res.json({
        success: false,
        message: errorMsg
      })
    });
  });
});

export default userRoutes;