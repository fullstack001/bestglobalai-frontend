import React from "react";
import Nav from "../Landing/Nav";
import Footer from "../Landing/Footer";
import Subscription from "../Landing/Subscription";
import Extra from "../Landing/Extra";

const Pricing = () => {
  return (
    <div className="bg-gray-950 text-white font-sans">
      <Nav />
      <h1>Pricing Page</h1>
      <Subscription />
      <Extra />
      <Footer />
    </div>
  );
};

export default Pricing;
