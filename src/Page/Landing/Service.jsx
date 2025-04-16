import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { categories } from "../../lib/category";

import Nav from "./Nav";
import Footer from "./Footer";
const apiPort = process.env.REACT_APP_API_PORT;

const Service = () => {
  const [email, setEmail] = useState("");
  const [selectedAPIs, setSelectedAPIs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e, api) => {
    if (e.target.checked) {
      setSelectedAPIs((prevSelectedAPIs) => [...prevSelectedAPIs, api]);
    } else {
      setSelectedAPIs((prevSelectedAPIs) =>
        prevSelectedAPIs.filter(
          (selectedApi) => selectedApi.label !== api.label
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please enter your email address.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

    if (selectedAPIs.length === 0) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please select at least one API.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${apiPort}/api/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          selectedAPIs,
        }),
      });

      if (response.ok) {
        toast.success(
          <div className="custom-toast flex">
            <IoCloseCircleOutline className="custom-icon" />
            <div className="mt-4">
              Your selection has been sent successfully.
            </div>
          </div>,
          {
            className: "success-toast",
            autoClose: 3000,
            hideProgressBar: true,
          }
        );
        setEmail("");
        setSelectedAPIs([]);
      } else {
        alert("Failed to send your selection. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending your selection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950">
      <Nav />
      <div
        id="container-normal"
        className="container py-28 mx-auto max-w-6xl relative w-full bg-cover bg-center text-white font-sans"
      >
        <h1 className="text-2xl mt-10 font-bold text-center">
          Welcome to Best Global AI - Select Your APIs
        </h1>
        <div className="relative mt-10">
          <iframe
            className="w-full h-[400px] max-w-4xl mx-auto rounded-lg border-white border-8 border-spacing-4 shadow-lg"
            src="https://www.youtube.com/embed/5hq9ZBiFmrU"
            title="API Installation Choices"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="flex justify-between">
            <div>
              <label htmlFor="emailInput" className="block mt-4 font-semibold">
                Enter Your Email:
              </label>
              <input
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border p-2 w-full max-w-lg mt-2 text-black"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="mt-6 text-xl font-bold">{category.title}</h2>
              {category.apis.map((api, idx) => (
                <div key={idx} className="mt-2 flex">
                  <input
                    type="checkbox"
                    id={`api-${index}-${idx}`}
                    value={api.label}
                    checked={selectedAPIs.some(
                      (selectedApi) => selectedApi.label === api.label
                    )}
                    onChange={(e) => handleCheckboxChange(e, api)}
                  />
                  <label htmlFor={`api-${index}-${idx}`} className="ml-2">
                    {api.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
