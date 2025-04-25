import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ContestPromo from "../../components/ContestComponent";

const Contest = () => {
  return (
    <div className="bg-gray-950 text-white font-sans">
      <Nav />
      <div className="mt-28">
        <ContestPromo />
      </div>
      <Footer />
    </div>
  );
};

export default Contest;
