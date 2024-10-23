//----- Imports
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./db/conn.mjs";
import helmet from "helmet";
// Authentication
import passport from "passport";
import session from "express-session";
import "./configs/passportConfig.mjs";
// Routes
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/user.mjs";
import postRoutes from "./routes/post.mjs";
import likeRoutes from "./routes/like.mjs";
import dislikeRoutes from "./routes/dislike.mjs";
import commentRoutes from "./routes/comment.mjs";
import followRoutes from "./routes/follow.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

//----- Middleware
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));
app.use(express.json());
app.use(helmet());
// Authentication
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 10 } // 10mins
}));
app.use(passport.initialize());
app.use(passport.session());

//----- Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/dislikes", dislikeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follows", followRoutes);
// Ping to wakeup server
app.get("api/ping", (req, res) => {
  res.json({ success: true });
});

//----- Server Connection
app.listen(PORT, () => {
  connectToDB(); // DB connection
  console.log(`Server is running on port: ${PORT}`);
});