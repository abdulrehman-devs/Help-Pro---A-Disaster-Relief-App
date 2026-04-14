import express from 'express';
import Feedback from '../models/feedback.js'
import { protect } from "../middleware/authMiddleware.js";
import Users from '../models/user.js';

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { type, role, rating, subject, message } = req.body;

  try {
    const userId = req.user.id;

    const userData = await Users.findById(userId);

    const feedback = new Feedback({ userId: userId, role: userData.role, type, rating, subject, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback Sent!", feedback })
  }
  catch (e) {
    res.status(500).json({ message: "Internal Server Error", e });
    console.log(e);
  }
});

router.get("/user", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const userFeedbacks = await Feedback.find({ userId });

    if (!userFeedbacks || userFeedbacks.length === 0) {
      res.status(409).json({ message: "No Feedbacks Currently!" })
    }

    res.status(201).json({ message: "Feedbacks Sent!", userFeedbacks })
  }
  catch (e) {
    res.status(500).json({ message: "Internal Server Error", e });
    console.log(e);
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find().populate(
      "userId",
      "name email phone role"
    );

    if (!allFeedbacks || allFeedbacks.length === 0) {
      return res.status(404).json({ message: "No Feedbacks Currently!" });
    }

    res.status(200).json({ message: "All Feedbacks Sent!", allFeedbacks });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

router.delete("/:id", protect, async (req, res) => {

  try {
    const feedbackId = req.params.id;

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await Feedback.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

export default router;
