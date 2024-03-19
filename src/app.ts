import express, { Application } from "express";
import "dotenv/config";
import { connectDB } from "./config/config";
import { errorHandler } from "./utils/helper";
import { userRouter } from "./routes/user.route";
const app: Application = express();

app.use(express.json());

app.use("/user", userRouter);

app.use(errorHandler);

connectDB(app);
