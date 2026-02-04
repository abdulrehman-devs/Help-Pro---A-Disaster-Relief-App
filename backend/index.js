import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`App started and running at ${process.env.BACKEND_PORT}`);
});

