import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToke, setAToken] = useState();
  const severUrl = import.meta.env.VITE_SERVER_URL;

  const adminValue = {
    aToke,
    setAToken,
    severUrl,
  };
  return (
    <AdminContext.Provider value={adminValue}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
