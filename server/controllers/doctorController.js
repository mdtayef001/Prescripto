import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// api for doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docID } = req.params;
    const docData = await doctorModel.findById(docID);
    await doctorModel.findByIdAndUpdate(docID, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability changed successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get doctor appointments for doctor
const doctorAppointments = async (req, res) => {
  try {
    const { id: docID } = req.decoded;

    const appointments = await appointmentModel.find({ docID });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { id: docID } = req.decoded;
    const { appointmentID } = req.body;
    const appointment = await appointmentModel.findById(appointmentID);
    if (appointment && appointment.docID === docID) {
      await appointmentModel.findByIdAndUpdate(appointmentID, {
        isCompleted: true,
      });

      const { docID, slotDate, slotTime } = appointment;
      const docData = await doctorModel.findById(docID);
      let slots_booked = docData.slots_booked;
      // remove the slot from slots_booked
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (slot) => slot !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docID, {
        slots_booked,
      });

      return res.json({
        success: true,
        message: "Appointment completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Action not allowed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id: docID } = req.decoded;
    const { appointmentID } = req.body;
    const appointment = await appointmentModel.findById(appointmentID);
    if (appointment && appointment.docID === docID) {
      await appointmentModel.findByIdAndUpdate(appointmentID, {
        canaled: true,
      });
      const { docID, slotDate, slotTime } = appointment;
      const docData = await doctorModel.findById(docID);
      let slots_booked = docData.slots_booked;
      // remove the slot from slots_booked
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (slot) => slot !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docID, {
        slots_booked,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Action not allowed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get dashboard data fo doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { id: docID } = req.decoded;
    const appointment = await appointmentModel.find({ docID });
    let earnings = 0;
    let patients = [];

    appointment.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    appointment.map((item) => {
      if (!patients.includes(item.userID)) {
        patients.push(item.userID);
      }
    });

    const dashData = {
      earnings,
      patients: patients.length,
      appointments: appointment.length,
      latestAppointments: appointment.reverse().slice(0, 5),
    };
    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { id: docID } = req.decoded;
    const doctor = await doctorModel.findById(docID).select(["-password"]);
    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { id: docID } = req.decoded;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docID, {
      fees,
      address,
      available,
    });
    res.json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  doctorLogin,
  doctorAppointments,
  completeAppointment,
  cancelAppointment,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
