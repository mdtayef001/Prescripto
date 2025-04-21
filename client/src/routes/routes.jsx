import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/Home/Home";
import MyProfile from "../pages/My-Profile/MyProfile";
import MyAppointments from "../pages/My-Appointments/MyAppointments";
import Doctors from "../pages/Doctors/Doctors";
import Appointment from "../pages/Appointment/Appointment";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Auth from "../pages/Auth/Auth";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AllAppointments from "../pages/Admin/AllAppointments";
import AddDoctor from "../pages/Admin/AddDoctor";
import DoctorsList from "../pages/Admin/DoctorsList";
import DoctorLayout from "../Layout/DoctorLayout";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorProfile from "../pages/Doctor/DoctorProfile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctors/:specialty",
        element: <Doctors />,
      },
      {
        path: "/appointment/:docID",
        element: <Appointment />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // user profile routes
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/my-appointments",
        element: <MyAppointments />,
      },
      // auth routes
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  // admin routs
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/all-appointments",
        element: <AllAppointments />,
      },
      {
        path: "/admin/add-doctor",
        element: <AddDoctor />,
      },
      {
        path: "/admin/doctor-list",
        element: <DoctorsList />,
      },
    ],
  },

  // doctor routes
  {
    path: "/doctor",
    element: <DoctorLayout />,
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: "/doctor/doctor-dashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "/doctor/doctor-appointments",
        element: <DoctorAppointment />,
      },

      {
        path: "/doctor/doctor-profile",
        element: <DoctorProfile />,
      },
    ],
  },
]);

export default routes;
