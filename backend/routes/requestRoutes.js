import express from "express";
import Request from "../models/requests.js";
import Users from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", protect, authorizeRoles("victim"), async (req, res) => {
  try {
    const { deliveryType, description, location } = req.body;

    if (!deliveryType || !description || !location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Delivery type, description, and valid location are required." });
    }

    const victimId = new mongoose.Types.ObjectId(req.user.id);
    const activeRequests = await Request.countDocuments({
      victim: victimId,
      status: { $in: ["pending", "accepted"] }
    });

    if (activeRequests >= 2) {
      return res.status(403).json({ message: "You cannot have more than 2 active requests." });
    }

    const victimExists = await Users.findById(victimId);
    if (!victimExists) return res.status(400).json({ message: "Invalid victim ID." });

    const newRequest = new Request({
      deliveryType,
      description,
      location,
      victim: victimId,
      name: req.user.name,
      phone: req.user.phone,
      status: "pending"
    });

    const savedRequest = await newRequest.save();

    console.log("Saved request:", savedRequest);

    res.status(201).json({ message: "Request submitted", savedRequest });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, authorizeRoles("donor"), async (req, res) => {

  try {
    const requests = await Request.find({
      status: { $in: ["pending", "accepted"] },
    }).populate("victim", "name phone email");

    res.status(200).json(requests);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/victim", protect, authorizeRoles("victim"), async (req, res) => {
  try {
    const victimId = new mongoose.Types.ObjectId(req.user.id);

    const activeRequests = await Request.find({
      victim: victimId,
      status: { $in: ["pending", "accepted"] }
    }).populate("donor", "name phone email");

    const pendingCount = await Request.countDocuments({
      victim: victimId,
      status: "pending"
    });

    const fulfilledCount = await Request.countDocuments({
      victim: victimId,
      status: "fulfilled"
    });

    const totalCount = await Request.countDocuments({
      victim: victimId
    });

    console.log("Fetched requests for victim:", activeRequests);

    res.status(200).json({
      activeRequests,
      pendingCount,
      fulfilledCount,
      totalCount
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/donor", protect, authorizeRoles("donor"), async (req, res) => {

  const donorId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const donorRequests = await Request.find({ donor: donorId }).populate("victim", "name phone email");

    const pendingCount = await Request.countDocuments({
      donor: donorId,
      status: "pending"
    });

    const fulfilledCount = await Request.countDocuments({
      donor: donorId,
      status: "fulfilled"
    });

    const totalCount = await Request.countDocuments({
      donor: donorId
    });

    res.status(200).json({
      donorRequests,
      pendingCount,
      fulfilledCount,
      totalCount
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.deleteOne();

    return res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
