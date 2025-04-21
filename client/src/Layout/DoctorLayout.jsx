import React from "react";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import UseDoctorContext from "../hooks/UseDoctorContext";
import Navbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";
import { AdminLogin } from "../pages/Admin/AdminLogin";

const DoctorLayout = () => {
  useDocumentTitle("Prescripto | Doctor");
  const { dToken } = UseDoctorContext();
  return dToken ? (
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

export default DoctorLayout;
