import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import * as mongoose from "mongoose";
import cors from "cors";
dotenv.config();

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("Connected to MongoDB ⚡️");
});
mongoose.set("strictQuery", true);

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(json());
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
