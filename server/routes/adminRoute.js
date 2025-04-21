import express from "express";
import {
  addDoctor,
  adminLogin,
  allDoctors,
  appointmentsList,
  cancelAppointment,
  dashboardData,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.get("/appointments", authAdmin, appointmentsList);
adminRouter.post("/login", adminLogin);
adminRouter.post("/add-doctor", authAdmin, addDoctor);
adminRouter.patch("/change-availability/:docID", authAdmin, changeAvailability);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointment);
adminRouter.get("/dashboard", dashboardData);

export default adminRouter;
