import { NavLink } from "react-router-dom";
import useAdminContext from "../../hooks/useAdminContext";
import { assets } from "../../assets/assets_admin/assets";

const Sidebar = () => {
  const { aToken } = useAdminContext();

  return (
    <aside className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="admin_sidebar text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin/dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
