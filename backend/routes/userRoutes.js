import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Users from '../models/user.js';

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

export default router;
