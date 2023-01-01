import { Router } from "express";
import { login, signup, user } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/user", user);

export default authRouter;
