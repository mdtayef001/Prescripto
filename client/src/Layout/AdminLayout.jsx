import React from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useAdminContext from "../hooks/useAdminContext";
import { AdminLogin } from "../pages/Admin/AdminLogin";
import Navbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  useDocumentTitle("Prescripto | Admin");

  const { aToken } = useAdminContext();

  return aToken ? (
    <section className="bg-[#F8F9FD]">
      <Navbar />
      <main>
        <div className="flex items-start">
          <Sidebar />
          <div>{<Outlet />}</div>
        </div>
      </main>
    </section>
  ) : (
    <AdminLogin />
  );
};

export default AdminLayout;
