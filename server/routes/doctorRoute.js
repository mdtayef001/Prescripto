import express from "express";
import {
  cancelAppointment,
  completeAppointment,
  doctorAppointments,
  doctorDashboard,
  doctorList,
  doctorLogin,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

// all get endpoints
doctorRouter.get("/list", doctorList);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);

// all post endpoints
doctorRouter.post("/login", doctorLogin);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.post("/profile-update", authDoctor, updateDoctorProfile);

export default doctorRouter;
