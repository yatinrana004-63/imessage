import express from "express";
import { getUsersForSidebar } from "../controllers/message.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/users",getUsersForSidebar)

export default router;