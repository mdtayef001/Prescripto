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
    <main className="bg-[#F8F9FD]">
      <Navbar />
      <section>
        <div className="flex items-start">
          <Sidebar />
          <div>{<Outlet />}</div>
        </div>
      </section>
    </main>
  ) : (
    <AdminLogin />
  );
};

export default AdminLayout;
