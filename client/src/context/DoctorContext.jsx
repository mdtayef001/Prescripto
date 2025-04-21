import { createContext, useState } from "react";
import userSecureDoc from "../hooks/userSecureDoc";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dtoken") || "");
  const secureDoc = userSecureDoc();
  const [docDetails, setDocDetails] = useState(false);

  // fetch doctor appointments
  const {
    data: appointments = [],
    refetch: appointmentsRefetch,
    isLoading: appointmentsLoading,
  } = useQuery({
    queryKey: ["doctorAppointments"],
    enabled: !!dToken,
    queryFn: async () => {
      try {
        const { data } = await secureDoc.get("/api/doctor/appointments");
        return data.appointments;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  // fetch data for doctor dashboard
  const { data: dashData = {}, isLoading: dashDataLoading } = useQuery({
    queryKey: ["doctorDashboard"],
    enabled: !!dToken,
    queryFn: async () => {
      try {
        const { data } = await secureDoc.get("/api/doctor/dashboard");
        if (data.success) {
          return data.dashData;
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  // fet doctor profile details

  const {
    data,
    isLoading: docLoading,
    refetch: docRefetch,
  } = useQuery({
    queryKey: ["doctorProfile"],
    enabled: !!dToken,
    queryFn: async () => {
      try {
        const { data } = await secureDoc.get("/api/doctor/profile");
        if (data.success) {
          setDocDetails(data.doctor);
        }
        return data.doctor;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  const calculateAge = (dob) => {
    const [year, month, day] = dob.split("-").map(Number);
    const birthday = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();

    return age;
  };

  const value = {
    dToken,
    setDToken,
    secureDoc,
    appointments,
    appointmentsRefetch,
    appointmentsLoading,
    calculateAge,
    dashData,
    dashDataLoading,
    docDetails,
    docLoading,
    docRefetch,
    setDocDetails,
    data,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
