import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully")
    }
    catch (e) {
        console.log("Error connecting to database", e)
        process.exit(1);
    }
}

export default connectDB;