import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Users from '../models/user.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const userExists = await Users.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: "Email Already Registered." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({ name, email, password: hashedPassword, phone, role });
        await newUser.save();

        return res.status(201).json({ message: "User Created Successfully", newUser });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server error", e });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await Users.findOne({ email });

        if (!userExists) {
            console.log("User not found.");
            return res.status(404).json({ message: "User Not Found" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userExists.password
        );

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                id: userExists._id,
                name: userExists.name,
                phone: userExists.phone,
                role: userExists.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("Logged in.");
        return res.status(200).json({ message: "Logged in.", token: token, role: userExists.role });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/get/info", protect, async (req, res) => {

    try {
        const userId = req.user.id;

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (e) {
        console.error("Error fetching user info:", e);
        res.status(500).json({ message: "Server Error" });
    }
});

router.patch("/update/info", protect, async (req, res) => {

    try {
        const userId = req.user.id;

        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User information updated successfully",
            user: updatedUser,
        });

    }
    catch (error) {
        console.error("Error updating user:", error);

        res.status(500).json({
            message: "Server error while updating user",
        });
    }
});

router.post("/feedback", protect, async (req, res) => {
    const { type, role, rating, subject, description } = req.body;

    try {
        const userId = req.user.id;

        const userData = await Users.findById(userId);

        const feedback = Feedback({ userId: userId, role: userData.role, type, rating, subject, description });
        await feedback.save();

        res.status(201).json({ message: "Feedback Sent!", feedback })
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error", e });
        console.log(e);
    }
});

router.get("/user/feedback", protect, async (req, res) => {
    try {
        const userId = req.user.id;

        const userFeedbacks = await Feedback.findById(userId);

        if (!userFeedbacks) {
            res.status(409).json({ message: "No Feedbacks Currently!"})
        }

        res.status(201).json({ message: "Feedbacks Sent!", userFeedbacks })
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error", e });
        console.log(e);
    }
});

router.get("/feedback", protect, async (req, res) => {
    try {
        const userId = req.user.id;

        const allFeedbacks = await Feedback.findById(userId);

        if (!allFeedbacks) {
            res.status(409).json({ message: "No Feedbacks Currently!"})
        }

        res.status(201).json({ message: "All Feedbacks Sent!", allFeedbacks })
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error", e });
        console.log(e);
    }
});



export default router;
