import express from "express";
import {
  registerUser,
  loginUser,
  searchUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/searchUser", protect, searchUser);

export default router;
