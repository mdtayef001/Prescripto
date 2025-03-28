import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="container mx-auto">
      <div className="grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gra leading-6">
            Distinctively recaptiualize 24/365 manufactured products whereas
            next-generation manufactured products. Assertively benchmark
            error-free niche markets and exceptional bandwidth. Holisticly
            iterate high
          </p>
        </div>
        {/* mid */}
        <div>
          <p className="text-xl font-medium mb-5 uppercase">Company</p>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
                to="/doctors"
              >
                All Doctor
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollTo(0, 0)}
                className="hover:underline"
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>info@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm py-5 ">
          Copyright {new Date().getFullYear()} @ Prescripto - All Right
          Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
