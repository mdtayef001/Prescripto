import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

const UseDoctorContext = () => {
  const provider = useContext(DoctorContext);
  return provider;
};

export default UseDoctorContext;
