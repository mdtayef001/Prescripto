import React from "react";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useAdminContext from "../hooks/useAdminContext";
import { AdminLogin } from "../pages/Admin/AdminLogin";
import Navbar from "../components/Admin/Navbar";

const AdminLayout = () => {
  useDocumentTitle("Prescripto | Admin");

  const { aToken } = useAdminContext();
  console.log(aToken);

  return aToken ? (
    <section className="bg-[#F8F9FD]">
      <Navbar />
    </section>
  ) : (
    <AdminLogin />
  );
};

export default AdminLayout;
