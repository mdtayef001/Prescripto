import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const useAdminContext = () => {
  const AdminProvider = useContext(AdminContext);
  return AdminProvider;
};

export default useAdminContext;
