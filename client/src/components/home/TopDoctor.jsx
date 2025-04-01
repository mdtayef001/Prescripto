import { Link } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import DoctorCard from "../DoctorCard/DoctorCard";

const TopDoctor = () => {
  const { doctors } = useAppContext();

  return (
    <section className=" my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
      <p className="md:w-1/3 text-center text-sm mx-auto">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
      <div className="text-center">
        <Link to={"/doctors"}>
          <button
            onClick={() => scrollTo(0, 0)}
            className="bg-primary text-white px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TopDoctor;
