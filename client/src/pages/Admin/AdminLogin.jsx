import { useState } from "react";
import useAdminContext from "../../hooks/useAdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import UseDoctorContext from "../../hooks/UseDoctorContext";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("tayef@9600");
  const [docEmail, setDocEmail] = useState("sarah@gmail.com");
  const [docPassword, setDocPassword] = useState("tayef098");
  const { setAToken, severUrl } = useAdminContext();
  const { setDToken } = UseDoctorContext();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${severUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data?.token);
          setAToken(data?.token);
          toast.success("Login Successful");
          navigate("/admin");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${severUrl}/api/doctor/login`, {
          email: docEmail,
          password: docPassword,
        });
        if (data.success) {
          localStorage.setItem("dtoken", data?.token);
          setDToken(data?.token);
          toast.success("Login Successful");
          navigate("/doctor");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="min-h-[80vh] flex items-centerS">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        {state === "Admin" ? (
          <>
            <div className="w-full">
              <p>Email</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <p>Email</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                placeholder=""
                onChange={(e) => setDocEmail(e.target.value)}
                value={docEmail}
                required
              />
            </div>

            <div className="w-full">
              <p>Password</p>
              <input
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                placeholder=""
                onChange={(e) => setDocPassword(e.target.value)}
                value={docPassword}
                required
              />
            </div>
          </>
        )}

        <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="cursor-pointer underline text-blue-400"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="cursor-pointer underline text-blue-400"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
