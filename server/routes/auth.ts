import { Router } from "express";
import { login, signup, user } from "../controllers/auth";
import { authenticateToken } from "../middlewares";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/user", authenticateToken, user);

export default authRouter;
