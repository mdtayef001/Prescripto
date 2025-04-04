import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("token") || "");
  const severUrl = import.meta.env.VITE_SERVER_URL;
  console.log("User --> admin");

  const adminValue = {
    aToken,
    setAToken,
    severUrl,
  };
  return (
    <AdminContext.Provider value={adminValue}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
