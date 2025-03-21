import { Link } from "react-router-dom";
import { specialityData } from "../../assets/assets_frontend/assets";

const Specialty = () => {
  return (
    <section
      id="specialty"
      className="flex flex-col items-center gap-4 py-16  text-gray-800 "
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex items-center sm:justify-center  w-full pt-5 gap-4 overflow-scroll">
        {specialityData.map((item, i) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs flex-shrink-0 hover:translate-y-[-20px] transition-all duration-500"
            to={`/doctors/${item.speciality}`}
            key={i}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Specialty;
