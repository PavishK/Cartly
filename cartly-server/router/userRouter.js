import express from "express";
import { Login_User, Profile_Check, Register_User } from "../controller/userController.js";
import { auth } from '../middleware/auth.js';

const router = new express.Router();

router.post("/login",Login_User);
router.post("/register",Register_User);

router.get("/verify-session", auth, Profile_Check);

export default router;