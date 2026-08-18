// const express = require('express');
import express from "express";
import "dotenv/config";
import User from "./models/user.models.js";
import { connectDb } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path";
// import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";
const app = express();
import { fileURLToPath } from "url";
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), 'public');
// import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});



app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }),clerkWebhook);

app.use(express.json())
app.use(cors({origin:FRONTEND_URL, credentials:true}));
app.use(clerkMiddleware());


app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// app.use("/api/ayth",authRoutes);
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'),(err) => 
     next(err));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
  // job.start()
  if(process.env.NODE_ENV === "production"){
    job.start();
  }
});
