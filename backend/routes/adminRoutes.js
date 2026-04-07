import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js';
import Request from '../models/requests.js';
import Users from '../models/user.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(409).json({ message: "Email Already Registered." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        return res.status(201).json({ message: "Admin Created Successfully", newAdmin });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server error", e });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });

        if (!adminExists) {
            return res.status(404).json({ message: "Admin Not Found" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            adminExists.password
        );

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const adminToken = jwt.sign(
            {
                adminId: adminExists._id,
                email: adminExists.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Logged in",
            adminToken
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/requests", protect, async (req, res) => {

    try {

        const requests = await Request.find().populate('donor', 'name phone');

        const totalRequests = await Request.countDocuments();

        const activeRequests = await Request.countDocuments({
            status: "Accepted"
        });

        const completedRequests = await Request.countDocuments({
            status: "Fulfilled"
        });

        const pendingRequests = await Request.countDocuments({
            status: "Pending"
        });

        res.status(200).json({
            totalRequests,
            activeRequests,
            pendingRequests,
            completedRequests,
            requests
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/users", protect, async (req, res) => {

    try {

        const users = await Users.find()
            .select("-password");

        const totalUsers = await Users.countDocuments();

        const totalDonors = await Users.countDocuments({
            role: "donor"
        });

        const totalVictims = await Users.countDocuments({
            role: "victim"
        });

        res.status(200).json({
            totalUsers,
            totalDonors,
            totalVictims,
            users
        });

    }
    catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});


export default router;
