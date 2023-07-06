//----- Imports
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./db/conn.mjs";
// Authentication
import passport from "passport";
import session from "express-session";
import "./configs/passportConfig.mjs";
// Routes
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/user.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

//----- Middleware
app.use(cors());
app.use(express.json());
// Authentication
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 20000 } // 20sec
}));
app.use(passport.initialize());
app.use(passport.session());

//----- Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//----- Server Connection
app.listen(PORT, () => {
  connectToDB(); // DB connection
  console.log(`Server is running on port: ${PORT}`);
});