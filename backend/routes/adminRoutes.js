import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js';

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


export default router;
