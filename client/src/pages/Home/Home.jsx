import React from "react";
import Hero from "../../components/home/Hero";
import Specialty from "../../components/home/Specialty";
import TopDoctor from "../../components/home/TopDoctor";
import Banner from "../../components/home/Banner";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Prescripto | Home");
  return (
    <>
      <Hero />
      <Specialty />
      <TopDoctor />
      <Banner />
    </>
  );
};

export default Home;
