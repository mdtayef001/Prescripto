import React from "react";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AdminLayout = () => {
  useDocumentTitle("Prescripto | Admin");

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
