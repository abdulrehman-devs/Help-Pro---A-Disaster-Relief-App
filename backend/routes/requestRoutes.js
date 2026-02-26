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
      status: { $in: ["Pending", "Accepted"] }
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
      status: "Pending"
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
      status: { $in: ["Pending", "Accepted"] },
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
      status: { $in: ["Pending", "Accepted"] }
    }).populate("donor", "name phone email");

    const pendingCount = await Request.countDocuments({
      victim: victimId,
      status: "Pending"
    });

    const acceptedCount = await Request.countDocuments({
      victim: victimId,
      status: "Accepted"
    });

    const fulfilledCount = await Request.countDocuments({
      victim: victimId,
      status: "Fulfilled"
    });

    const totalCount = await Request.countDocuments({
      victim: victimId
    });

    console.log("Fetched requests for victim:", activeRequests);

    res.status(200).json({
      activeRequests,
      pendingCount,
      acceptedCount,
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
    const donorRequests = await Request.find({ donor: donorId, status: "Accepted" }).populate("victim", "name phone email");

    const pendingCount = await Request.countDocuments({
      donor: donorId,
      status: "Accepted"
    });

    const fulfilledCount = await Request.countDocuments({
      donor: donorId,
      status: "Fulfilled"
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

router.delete("/donor/delete/:id", protect, async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "Accepted") {
      request.status = "Pending";
      request.donor = null;
      await request.save();
      return res.status(200).json({ message: "Accepted request reverted to Pending" });
    }

    if (request.status === "Fulfilled") {
      await request.deleteOne();
      return res.status(200).json({ message: "Fulfilled request deleted" });
    }

    return res.status(400).json({ message: "Cannot delete this request" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/donor/:id", protect, authorizeRoles("donor"), async (req, res) => {
  const donorId = new mongoose.Types.ObjectId(req.user.id);
  const requestId = req.params.id;

  try {
    const request = await Request.findByIdAndUpdate(
      requestId,
      { $set: { donor: donorId, status: "Accepted" } },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request Accepted | Donor Added", request });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
});

export default router;
