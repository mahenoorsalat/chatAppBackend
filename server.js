import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
await connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});