import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
};



export default connectDb