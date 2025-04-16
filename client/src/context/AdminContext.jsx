import { createContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("atoken") || "");
  const severUrl = import.meta.env.VITE_SERVER_URL;
  const axiosSecure = useAxiosSecure();

  // Fetch all doctors
  const {
    data: doctors = [],
    isLoading: loadingDoctors,
    refetch: refetchDoctors,
  } = useQuery({
    queryKey: ["all-doctors", "admin"],
    enabled: !!aToken, // only run the query if aToken is available
    queryFn: async () => {
      try {
        // use axiosSecure to get the doctors list
        const { data } = await axiosSecure.get(`/api/admin/all-doctors`);
        if (data.success) {
          return data.doctors;
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  // get all appointments
  const {
    data: appointments = [],
    isLoading: loadingAppointments,
    refetch: refetchAppointments,
  } = useQuery({
    queryKey: ["all-appointments", "admin"],
    enabled: !!aToken,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/api/admin/appointments`);
        if (data.success) {
          return data.appointments;
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
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

  const adminValue = {
    aToken,
    setAToken,
    severUrl,
    doctors,
    loadingDoctors,
    refetchDoctors,
    axiosSecure,
    appointments,
    loadingAppointments,
    refetchAppointments,
    calculateAge,
  };
  return (
    <AdminContext.Provider value={adminValue}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
