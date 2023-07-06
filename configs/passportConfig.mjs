// Authentication
import passport from "passport";
import { Strategy } from "passport-local";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.mjs";

const authUser = (user, password, done) => {
  User.findOne({ username: user })
  .then(doc => {
    // User doesn't exist
    if(!doc) { 
      return done(null, false, { message: "User not found" }); 
    }

    // Validate password
    bcrypt.compare(password, doc.password)
    .then(res => {
      if(res) {
        return done(null, doc);
      } else {
        return done(null, false, { message: "Incorrect password" }); 
      }
    });
  })
  .catch(err => done(err));
};

// Saves authenticated user-obj in "req.session.passport.user"
passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

// Saves object in "req.session.passport.user" to "req.user"
passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

passport.use(new Strategy (authUser));