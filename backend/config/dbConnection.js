import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL, {
      dbName: "helpro"
    });
    console.log("Atlas Connected Successfully");
  } catch (err) {
    console.error("Atlas connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;