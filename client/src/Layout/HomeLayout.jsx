import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <header className="px-4 sm:px-[10%]">
        <Navbar />
      </header>
      <main className=" px-4 sm:px-[10%]">
        <Outlet />
      </main>
      <footer className=" px-4 sm:px-[10%]">
        <Footer />
      </footer>
    </>
  );
};

export default HomeLayout;
