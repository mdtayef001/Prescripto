import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useSecureUser from "../hooks/useSecureUser";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const axiosUser = useSecureUser();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // Fetching doctors data
  const {
    data: doctors = [],
    refetch: doctorRefetch,
    isLoading: doctorDataLoading,
  } = useQuery({
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

  // Fetching user data
  const {
    data: user = {},
    isLoading: userDataLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user-data"],
    enabled: !!token,
    queryFn: async () => {
      try {
        const { data } = await axiosUser.get("/api/user/user-details");
        if (data.success) {
          setUserData(data.userData);
          return data.userData;
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
    token,
    setToken,
    user,
    userData,
    doctors,
    setUserData,
    userDataLoading,
    doctorDataLoading,
    userRefetch,
    doctorRefetch,
    axiosUser,
    axiosPublic,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
