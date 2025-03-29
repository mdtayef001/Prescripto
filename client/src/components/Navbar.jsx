import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav className="flex items-center justify-between py-5 mb-5 border-b border-b-gray-400 text-sm ">
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
        <div className="hidden md:flex  items-center gap-2 cursor-pointer group relative">
          <img className="w-10 rounded-full" src={assets.profile_pic} alt="" />
          <img
            className="w-2.5 hidden md:block"
            src={assets.dropdown_icon}
            alt=""
          />
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
        <button className="bg-primary px-8 py-3 rounded-full text-white text-lg cursor-pointer hidden md:block ">
          <Link to={"/auth"}>Create account</Link>
        </button>
      )}
      <div className="w-full md:hidden flex items-center justify-end">
        <AiOutlineMenu
          onClick={() => setShowMenu(true)}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/* <p>menubutton</p> */}

      <div
        className={`${
          showMenu ? "fixed w-full" : "h-0 w-0"
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all ease-in-out duration-300`}
      >
        <div className="flex items-center justify-between px-5 py-6 ">
          <img className="w-36" src={assets.logo} alt="" />
          <RxCross2
            className="text-3xl cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="flex flex-col items-center gap-6 mt-5 px-5 text-lg font-medium uppercase">
          <li>
            <NavLink onClick={() => setShowMenu(false)} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              all doctor
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
