import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-primary flex rounded-lg px-6 sm:px10 lg:px-12 my-20 md:mx-10">
      {/* left */}
      <div className="flex-1 py-8 sm:py-12 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
          <p>Book Appointment</p>
          <p className="mt-4"> With 100+ Trusted Doctors</p>
        </div>
        <Link to={"/auth"}>
          <button
            onClick={() => scrollTo(0, 0)}
            className="bg-white text-gray-600 rounded-full px-8 py-3 text-sm mt-6 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Create Account
          </button>
        </Link>
      </div>
      {/* right */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 mx-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </section>
  );
};

export default Banner;
