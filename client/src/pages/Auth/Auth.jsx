import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Auth = () => {
  useDocumentTitle("Appointment | Auth");

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
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
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">
              Create Account
            </button>
          ) : (
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">
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
