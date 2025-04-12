import express from "express";
import {
  addDoctor,
  adminLogin,
  allDoctors,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/add-doctor", authAdmin, addDoctor);
adminRouter.post("/login", adminLogin);

export default adminRouter;
