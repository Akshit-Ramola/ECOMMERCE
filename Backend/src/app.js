import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));




// Test Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use('/api/auth', authRouter);

export { app, connectDB };
