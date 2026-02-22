import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`App started and running at ${process.env.BACKEND_PORT}`);
});

