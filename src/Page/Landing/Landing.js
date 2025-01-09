import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Hero from "./Hero";
import Feature from "./Feature";
import Subscription from "./Subscription";
import Extra from "./Extra";
import Faq from "./Faq";
import Blog from "./Blog";
import Footer from "./Footer";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <Hero />
        <Feature />
        <Subscription />
        <Extra />
        <Faq />
        <Blog />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
