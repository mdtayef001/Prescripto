import express from "express";
import {
  getUserDetails,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-details", authUser, getUserDetails);
userRouter.post("/update-profile", authUser, updateProfile);

export default userRouter;
