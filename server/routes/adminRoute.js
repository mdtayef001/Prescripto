import express from "express";
import {
  addDoctor,
  adminLogin,
  allDoctors,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/add-doctor", authAdmin, addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.patch("/change-availability/:docID", changeAvailability);

export default adminRouter;
