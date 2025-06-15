import React, { useEffect } from "react";
import Tippy from "@tippyjs/react"; // Import Tippy.js
import "tippy.js/dist/tippy.css"; // Import Tippy.js styles
import Nav from "./Nav";
import Hero from "./Hero";
import Feature from "./Feature";
import Subscription from "./Subscription";
import Extra from "./Extra";
import Blog from "./Blog";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <Hero />
        {/* <div className="bg-yellow-100 p-6 rounded-xl shadow-lg mt-12 text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🎁 Enter to Win a Free Professional Landing Page!
          </h2>
          <p className="mb-4 text-gray-700">
            Enter to win a free professional landing page promotion for your
            business. Click the button below.
          </p>
          <a
            href="/contest"
            className="inline-block bg-[#27ae60] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#219150] transition"
          >
            Enter the Contest
          </a>
        </div> */}
        <Feature />
        {/* <Subscription /> */}
        {/* <Extra /> */}
        <Blog />
        <Footer />
        <Tippy content="Click here to ask any questions about our business plans.">
          <a
            href="https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiNmQxYjZiZWYy%0D%0AMDZlNDQwMDg5Mzg5YzU4ZmMyOTdkMzIiLCJ1c2VybmFtZSI6IjA3NDFmN2M1ZTFkMzRhOGNhNTk4%0D%0AM2QxZDc5NjQ1NTBjIn0%3D "
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-[5%] left-[5%] bg-[#27ae60] text-xl text-white p-4 rounded-full shadow-lg hover:bg-[#219150] transition"
            style={{ zIndex: 1000 }}
          >
            💬
          </a>
        </Tippy>
      </div>
    </div>
  );
};

export default Landing;
