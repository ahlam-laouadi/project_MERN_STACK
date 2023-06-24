import express from "express";
import { getUser } from "../controllers/user.js";
import {
  sendMessage,
  getChat,
  getMyChats,
} from "../controllers/messageController.js";

import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user/:id", getUser);

router.post("/user/:id/message", verifyToken, sendMessage);

router.get("/user/:id/chat", verifyToken, getChat);

router.get("/chats", verifyToken, getMyChats);

export default router;
