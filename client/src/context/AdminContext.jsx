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

  const adminValue = {
    aToken,
    setAToken,
    severUrl,
    doctors,
    loadingDoctors,
    refetchDoctors,
    axiosSecure,
  };
  return (
    <AdminContext.Provider value={adminValue}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
