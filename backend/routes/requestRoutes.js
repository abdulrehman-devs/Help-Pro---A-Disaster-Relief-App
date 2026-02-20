import express from "express";
import Request from "../models/requests.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("victim"), async (req, res) => {

  try {
    const { deliveryType, description, location } = req.body;

    if (!deliveryType || !location || !description || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Delivery type and valid location are required." });
    }

    const activeRequests = await Request.countDocuments({
      victim: req.user.id,
      status: { $in: ["pending", "accepted"] }
    });

    if (activeRequests >= 2) {
      return res.status(403).json({ message: "You cannot have more than 2 active requests." });
    }

    const newRequest = new Request({
      deliveryType,
      victim: req.user.id,
      name: req.user.name,
      phone: req.user.phone,
      description,
      location,
      status: "pending"
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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

router.get("/victim/requests/", protect, authorizeRoles("victim"), async (req, res) => {

  const victimId = req.user._id;

  try {
    const victimRequests = await Request.find({victim: victimId}).populate("donor", "name phone email");
    res.status(200).json(victimRequests);
  }

  catch (e) {
    console.error(e);
    res.status(500).json({message: "Server Error"});
  }
})

router.get("/donor/requests/", protect, authorizeRoles("donor"), async (req, res) => {

  const donorId = req.user._id;

  try {
    const donorRequests = await Request.find({donor: donorId}).populate("victim", "name phone email");
    res.status(200).json(donorRequests);
  }

  catch (e) {
    console.error(e);
    res.status(500).json({message: "Server Error"});
  }
})

export default router;
