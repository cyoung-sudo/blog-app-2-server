import express from "express";
// Authentication
import passport from "passport";

const authRoutes = express.Router();

//----- Login existing user
authRoutes.post("/login", (req, res, next) => {
  // Passport local strategy middleware
  passport.authenticate("local", (err, user, info) => {
    if(err) next(err);

    // Invalid login
    if(!user) {
      res.json({
        success: false,
        message: info.message
      });
    } 

    // Successful login
    if(user) {
      req.logIn(user, err => {
        if(err) next(err);
        res.json({
          success: true,
          user
        });
      });
    }
  })(req, res, next);
});

//----- Logout authenticated user
authRoutes.delete("/logout", (req, res, next) => {
  req.logOut(err => {
    if(err) next(err);
    res.json({ success: true });
  })
});

//----- Retrieve authenticated user
authRoutes.get("/authUser", (req, res) => {
  if(req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user
    });
  } else {
    res.json({
      success: false,
      message: "No session found"
    });
  }
});

export default authRoutes;