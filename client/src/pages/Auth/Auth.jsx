import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Auth = () => {
  useDocumentTitle("Appointment | Auth");
  const { token, setToken, axiosPublic } = useAppContext();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("tayef098");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sign up
      if (state === "Sign Up") {
        // req to the sign up api
        const { data } = await axiosPublic.post("/api/user/register", {
          name,
          email,
          password,
        });
        // if the sign up is successful
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success("Account Created Successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
        // login
      } else {
        // req to the login api
        const { data } = await axiosPublic.post("/api/user/login", {
          email,
          password,
        });
        //if the login is successful
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success("Login Successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return token ? (
    <Navigate to="/" replace={true} />
  ) : (
    <section className="min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="min-h-[80vh] flex items-center  justify-center"
      >
        {/* signup */}
        <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-300 rounded-xl text-gray-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}{" "}
          </p>
          <p>
            Please {state === "Sign Up" ? "Sign Up" : "Login"} to book
            appointment
          </p>
          {state === "Sign Up" ? (
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          ) : null}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
          {state === "Sign Up" ? (
            <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
              Create Account
            </button>
          ) : (
            <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
              Login
            </button>
          )}
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Auth;
