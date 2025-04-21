import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets_admin/assets.js";
import useAdminContext from "../../hooks/useAdminContext";
import { toast } from "react-toastify";
import UseDoctorContext from "../../hooks/UseDoctorContext.jsx";

const Navbar = () => {
  const { aToken, setAToken } = useAdminContext();
  const { dToken, setDToken } = UseDoctorContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("atoken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dtoken");
    navigate("/admin");
    toast.success("Logout Successfully");
  };

  return (
    <section className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => navigate("/")}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer hover:bg-primary/80 transition-all duration-200"
      >
        Logout
      </button>
    </section>
  );
};

export default Navbar;
