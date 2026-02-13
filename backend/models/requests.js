import mongoose from "mongoose";
import Users from '../models/user.js';

const requestSchema = new mongoose.Schema(
  {
    deliveryType: {
      type: String,
      required: true,
      trim: true
    },

    victim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },

      coordinates: {
        type: [Number], 
        required: true
      }
    },

    status: {
      type: String,
      enum: [
        "pending",   
        "accepted",    
        "completed",   
        "rejected",   
        "cancelled"    
      ],
      default: "pending"
    }

  },

  { timestamps: true }
);

requestSchema.index({ location: "2dsphere" });

const Request = mongoose.model("Request", requestSchema);

export default Request;
