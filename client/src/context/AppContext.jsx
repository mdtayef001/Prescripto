import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetching doctors data
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/api/doctor/list");
        if (data.success) {
          return data.doctors;
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  const value = {
    doctors,
    token,
    setToken,
    axiosPublic,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
