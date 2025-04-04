import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      imageURL,
    } = req.body;

    console.log({
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      imageURL,
    });

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageURL
    ) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // validating email formate

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctorData = {
      name,
      email,
      image: imageURL,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor added",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.send({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.send("Hello from login");
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addDoctor, adminLogin };
