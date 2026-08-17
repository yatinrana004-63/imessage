// const express = require("express")
import express from "express";
import "dotenv/config";
import cors from "cors";
import User from"./models/user.models.js";
import{ connectDb} from "./lib/db.js";
import {clerkMiddleware} from '@clerk/express';
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(express.json());
app.use(cors({ origin : FRONTEND_URL, credentials:true}));

app.use(clerkMiddleware());
console.log("DB_URL=", process.env.MONGO_URI);
app.listen(PORT, ()=>{ 
    connectDb();
    console.log("Server is up and running on PORT:", PORT)});