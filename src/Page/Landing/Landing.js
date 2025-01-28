import React, { useRef } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import Feature from "./Feature";
import Subscription from "./Subscription";
import Extra from "./Extra";
import Faq from "./Faq";
import Blog from "./Blog";
import Footer from "./Footer";

const Landing = () => {
  const faqRef = useRef(null);

  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <Hero />
        <Feature />
        <Subscription />
        <Extra />
        <Faq ref={faqRef} />
        <Blog />
        <Footer faqRef={faqRef}/>
      </div>
    </div>
  );
};

export default Landing;
