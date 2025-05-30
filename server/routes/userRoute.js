import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserDetails,
  loginUser,
  registerUser,
  updateProfile,
  userAppointments,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();
//
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
//
userRouter.get("/user-details", authUser, getUserDetails);
userRouter.get("/appointments", authUser, userAppointments);
userRouter.post("/update-profile", authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/cancel-appointment/:id", authUser, cancelAppointment);

export default userRouter;
