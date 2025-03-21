import { Link } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const TopDoctor = () => {
  const { doctors } = useAppContext();

  return (
    <section className=" my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
      <p className="w-1/3 text-center text-sm mx-auto">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doctor, index) => (
          <Link
            to={`/appointment/${doctor._id}`}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50" src={doctor.image} alt={doctor.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p>Available</p>
              </div>
              <h3 className="text-lg font-medium">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link to={"/doctors"}>
          <button
            onClick={() => scrollTo(0, 0)}
            className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
          >
            More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TopDoctor;
