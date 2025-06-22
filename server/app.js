import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router as authRoutes} from "./routes/auth.js";
import {router as passwordRoutes} from "./routes/password.js";
import {router as favouriteRoutes} from "./routes/favourite.js";

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET","POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))

app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({extended:true, limit:"1mb"}))
app.use(cookieParser())

app.use("/auth",authRoutes)
app.use("/password",passwordRoutes)
app.use("/favourite",favouriteRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

export {app}