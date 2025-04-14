import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// api to register a user
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // checking if all fields are present
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Messing Details" });
    }
    // checking if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    // checking if password is strong
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Weak Password" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// api to login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if all fields are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Messing Details" });
    }

    const user = await userModel.findOne({ email });

    // checking if user is exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    // checking if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // token generation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// api to get user details
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.decoded;
    const userData = await userModel.findById(id).select("-password");
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// api to update user details

const updateProfile = async (req, res) => {
  try {
    const upDatedData = req.body;
    const { id } = req.decoded;
    const { name, address, gender, dob, phone, imageURL } = upDatedData;

    if (!name || !gender || !dob || !phone) {
      res.status(400).json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(id, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
      image: imageURL,
    });

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, getUserDetails, updateProfile };
