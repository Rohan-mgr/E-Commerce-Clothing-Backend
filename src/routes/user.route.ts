import express from "express";
const router = express.Router();
import { createUser } from "../controller/user.controller";

router
  .route("/")
  .get((req, res) => {
    res.send("Get a User");
  })
  .post(createUser)
  .put((req, res) => {
    res.send("Update the user");
  });

export { router as userRouter };
