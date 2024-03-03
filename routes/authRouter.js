import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser, updateTheme, updateUserProfile } from "../controllers/authControllers.js";
import { checkRegisterData, checkLoginData, protect, checkThemeData, uploadAvatar, checkProfileData } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", checkRegisterData, registerUser);
authRouter.post("/login", checkLoginData, loginUser);
authRouter.get("/current", protect, getCurrentUser);
authRouter.post("/logout", protect, logoutUser);
authRouter.patch("/themes", protect, checkThemeData, updateTheme); // to do
authRouter.patch("/update", protect, uploadAvatar, checkProfileData, updateUserProfile); // to do

export default authRouter;
