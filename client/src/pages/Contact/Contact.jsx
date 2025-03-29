import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Contact = () => {
  useDocumentTitle("Prescripto | Contact");
  return (
    <>
      <section>
        <div className="text-center text-2xl pt-10 text-gray-500">
          <p>
            CONTACT <span className="text-primary font-semibold">US</span>
          </p>
        </div>
        <div className="flex my-10 flex-col justify-center md:flex-row gap-10 text-sm">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.contact_image}
            alt=""
          />
          <div className="flex flex-col justify-center items-start gap-6 ">
            <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
            <p className="text-gray-500">
              00000 Willms Station <br /> Suite 000, Washington, USA
            </p>
            <p className="text-gray-500">
              Tel: (000) 000-0000 <br /> Email: info@gmail.com
            </p>
            <p className="font-semibold text-lg text-gray-600">
              CAREERS AT PRESCRIPTO
            </p>
            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button className="bg-primary text-white px-12 py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
              Explore Jobs
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
