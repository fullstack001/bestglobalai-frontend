import React from "react";
import { useNavigate } from "react-router-dom";

import hero_background from "../../assets/images/landing/hero.png";
import bolt_shift_icon from "../../assets/images/landing/bolt_shift.png";
import light_box from "../../assets/images/landing/lightbox.png";
import featherDev from "../../assets/images/landing/featherDev.png";
import spherule from "../../assets/images/landing/spherule.png";
import globalBank from "../../assets/images/landing/globalBank.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="container py-28 mx-auto relative w-full h-screen bg-cover bg-center bg-opacity-30"
      style={{ backgroundImage: `url(${hero_background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white max-w-5xl mx-auto pt-10 md:pt-32 px-6 md:px-12">
        <button
          //   onClick={() => navigate("/get-started")}
          className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-800 transition duration-300 mb-8 text-gray-300"
        >
          WELCOME TO THE FUTURE
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6">
          Revolutionize Your Social Media and Mailing Campaigns with AI-Powered
          Interactive Avatars
        </h1>
        <p className="text-lg sm:text-xl mb-6 text-gray-300">
          Take your digital marketing to the next level with our AI-driven
          platform, designed to automate social media and mailing campaigns.
          Engage your audience like never before using lifelike, interactive
          avatars that communicate in multiple languages. Whether you are
          targeting a global market or creating personalized content, our
          solution delivers intelligent, multilingual interactions that
          captivate and convert.
        </p>

        <p className="font-semibold mt-5 md:mt-20 text-lg sm:text-xl text-gray-300">
          Trusted by thousands of companies worldwide
        </p>

        <div className="block md:flex justify-center md:space-x-8 mt-5 md:mt-20">
          <div className="text-center mb-2 md:mb-1">
            <img
              src={bolt_shift_icon}
              alt="Boltshift"
              className="w-auto h-6 md:h-12 m-auto"
            />
          </div>

          <div className="text-center mb-2 md:mb-1">
            <img
              src={light_box}
              alt="Boltshift"
              className="w-auto h-6 md:h-12 m-auto"
            />
          </div>

          <div className="text-center mb-2 md:mb-1">
            <img
              src={featherDev}
              alt="Boltshift"
              className="w-auto h-6 md:h-12 m-auto"
            />
          </div>

          <div className="text-center mb-2 md:mb-1">
            <img
              src={spherule}
              alt="Boltshift"
              className="w-auto h-6 md:h-12 m-auto"
            />
          </div>

          <div className="text-center mb-2 md:mb-1">
            <img
              src={globalBank}
              alt="Boltshift"
              className="w-auto h-6 md:h-12 m-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
