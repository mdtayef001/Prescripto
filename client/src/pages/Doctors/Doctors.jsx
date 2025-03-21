import React from "react";
import { useParams } from "react-router-dom";

const Doctors = () => {
  const { specialty } = useParams();
  console.log(specialty);

  return <section className="min-h-screen">Doctors</section>;
};

export default Doctors;
