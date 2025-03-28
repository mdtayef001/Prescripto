import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <Link
      to={`/appointment/${doctor._id}`}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <img className="bg-blue-50 w-full" src={doctor.image} alt={doctor.name} />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-green-500">
          <p className="w-2 h-2 rounded-full bg-green-500"></p>
          <p>Available</p>
        </div>
        <h3 className="text-lg font-medium">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.speciality}</p>
      </div>
    </Link>
  );
};

export default DoctorCard;
