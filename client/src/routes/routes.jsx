import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import MyProfile from "../pages/My-Profile/MyProfile";
import MyAppointments from "../pages/My-Appointments/MyAppointments";
import Doctors from "../pages/Doctors/Doctors";
import Appointment from "../pages/Appointment/Appointment";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
