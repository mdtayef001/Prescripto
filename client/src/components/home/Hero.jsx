import { IoArrowForwardSharp } from "react-icons/io5";
import { assets } from "../../assets/assets_frontend/assets";

const Hero = () => {
  return (
    <section className="lg:flex bg-primary  rounded-lg px-6 md:px10 lg:px20">
      {/* left */}
      <div className="md:w-1/2 flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-24" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#specialty"
          className="flex items-center  gap-2 bg-white text-gray-600 rounded-full px-8 py-3 text-sm m-auto md:ml-[8.5rem]  hover:scale-105 transition-all duration-300"
        >
          Book appointment <IoArrowForwardSharp className="text-sm" />
        </a>
      </div>
      {/* right */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </section>
  );
};

export default Hero;
