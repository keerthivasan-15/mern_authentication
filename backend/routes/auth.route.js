import express from "express";
import {signup,login,logout,verifyEmail,forgotPassword,resetPassword,checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-Auth",verifyToken,checkAuth);

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.post("/verifyEmail",verifyEmail);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:token",resetPassword);

export default router;