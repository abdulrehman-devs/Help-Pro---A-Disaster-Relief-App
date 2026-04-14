import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    role: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    rating: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true 
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;