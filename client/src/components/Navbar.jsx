import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav className="container mx-auto flex justify-between items-center py-5 mb-5 border-b border-b-gray-400 text-sm">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-center uppercase gap-6 font-medium">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/doctors">all doctor</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      {token ? (
        <div className="flex items-center gap-2 cursor-pointer group relative">
          <img className="w-10 rounded-full" src={assets.profile_pic} alt="" />
          <img className="w-2.5" src={assets.dropdown_icon} alt="" />
          <div className="hidden absolute top-0 right-0 text-base font-medium text-gray-600 z-20 group-hover:block pt-14 ">
            <div className="min-w-48 bg-stone-100 rounded  p-4 flex flex-col gap-4">
              <Link
                to={"/my-profile"}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </Link>
              <Link
                to={"/my-appointments"}
                className="hover:text-black cursor-pointer"
              >
                My Appointment
              </Link>
              <p
                onClick={() => setToken(false)}
                className="hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Link
          className="bg-primary px-8 py-3 rounded-full text-white text-lg cursor-pointer hidden md:block"
          to={"/register"}
        >
          <button className="cursor-pointer">Create account</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
