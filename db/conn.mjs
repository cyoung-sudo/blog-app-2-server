import mongoose from "mongoose";
const uri = process.env.ATLAS_URI || "";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const connectToDB = () => {
  mongoose.connect(uri, options)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(e => console.log(e));
}