import express from "express";
import { emailSupport } from "../controllers/authControllers.js";

const helpRouter = express.Router();

helpRouter.post("/", emailSupport);

export default helpRouter;
