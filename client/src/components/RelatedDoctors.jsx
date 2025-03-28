import { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import DoctorCard from "./DoctorCard/DoctorCard";
import { Link } from "react-router-dom";

const RelatedDoctors = ({ docID, speciality }) => {
  const { doctors } = useAppContext();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docID
      );
      setRelDoc(doctorData);
    }
  }, [doctors, speciality, docID]);

  return (
    <section className=" my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
      <p className="w-1/3 text-center text-sm mx-auto">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default RelatedDoctors;
