import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from './config/config.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}, (accessToken, refreshToken, profile, done) => {
    return dont(null, profile);
}))


app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}))


// Test Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

export { app, connectDB };
