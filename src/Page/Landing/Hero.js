import React from "react";

import hero_background from "../../assets/images/landing/hero.png";
import bolt_shift_icon from "../../assets/images/landing/bolt_shift.png";
import light_box from "../../assets/images/landing/lightbox.png";
import featherDev from "../../assets/images/landing/featherDev.png";
import spherule from "../../assets/images/landing/spherule.png";
import globalBank from "../../assets/images/landing/globalBank.png";

const Hero = () => {

  return (
    <section
      className="container py-28 mx-auto relative w-full min-h-screen bg-cover bg-center bg-opacity-30"
      style={{ backgroundImage: `url(${hero_background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white max-w-5xl mx-auto pt-10 md:pt-32 px-6 md:px-12">
        <button
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
       
      </div>
    </section>
  );
};

export default Hero;
