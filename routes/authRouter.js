import express from "express";
// import { registerUser, loginUser, getCurrentUser, logoutUser, updateTheme, updateUserProfile } from "../controllers/authControllers.js";
// import { checkRegisterData, checkLoginData, protect, checkThemeData, uploadAvatar, checkProfileData } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser, getCurrentUser, logoutUser, updateTheme} from "../controllers/authControllers.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateBody.js";
import { themeSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/current", authorization, getCurrentUser);
authRouter.post("/logout", authorization, logoutUser);
authRouter.patch("/themes", authorization, validateBody(themeSchema), updateTheme);
// authRouter.patch("/update", protect, uploadAvatar, checkProfileData, updateUserProfile); // to do

export default authRouter;
