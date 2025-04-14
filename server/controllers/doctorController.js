import doctorModel from "../models/doctorModel.js";

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

export { changeAvailability, doctorList };
