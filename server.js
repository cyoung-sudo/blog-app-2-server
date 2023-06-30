//----- Imports
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./db/conn.js";

const PORT = process.env.PORT || 5050;
const app = express();

//----- Middleware
app.use(cors());
app.use(express.json());

//----- Server Connection
app.listen(PORT, () => {
  connectToDB(); // DB connection
  console.log(`Server is running on port: ${PORT}`);
});