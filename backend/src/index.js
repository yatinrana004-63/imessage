// const express = require("express")
import express from "express";
import "dotenv/config";
import fs from "fs";
import path from"path";
import cors from "cors";
import User from"./models/user.models.js";
import{ connectDb} from "./lib/db.js";
import {clerkMiddleware} from '@clerk/express';
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(),"public")
app.use(express.json());
app.use(cors({ origin : FRONTEND_URL, credentials:true}));

app.use(clerkMiddleware());
app.get("/health",(req,res)=>{
    res.status(200).json({ok:true});
})

if(fs.existsSymc(publicDir)){
    app.use(express.static(publicDir));

    app.get("/{*any}",(req,res,next) =>  {
      res.sendFile(path.join(publicDir,"index.html"),(err) => next(err));
    });
}

console.log("DB_URL=", process.env.MONGO_URI);
app.listen(PORT, ()=>{ 
    connectDb();
    console.log("Server is up and running on PORT:", PORT)});