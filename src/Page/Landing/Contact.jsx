import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import Nav from "./Nav";
import Footer from "./Footer";

const apiPort = process.env.REACT_APP_API_PORT;

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please enter your first name.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

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
    setLoading(true);

    const response = await axios.post(`${apiPort}/api/contacts`, {
      firstName,
      lastName,
      email,
      phone,
      content,
    });

    if (response.status === 200) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Your message has been sent successfully.</div>
        </div>,
        {
          className: "success-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      setContent("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } else {
      toast.error("Server Error. Please try again later.");
    }
    setLoading(true);
  };

  return (
    <div className="bg-gray-950 text-white font-sans">
      <Nav />
      <div
        className="mt-[60px] bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: "url('/images/contact_banner.jpg')" }}
      >
        <div className="col-span-2 mt-2 text-center py-36">
          <h2 className="text-5xl font-semibold">Contact Us</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 gap-8 items-center container py-20">
          <div className="col-span-2">
            <ToastContainer />
          </div>          
          <div className="mt-2">
            <div>
              <label htmlFor="firstName">First Name</label>
            </div>
            <div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 mt-1 rounded-md text-black"
              />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 mt-1 rounded-md text-black"
              />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 rounded-md text-black"
              />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <label htmlFor="phone">Phone</label>
            </div>

            <div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mt-1 rounded-md text-black"
              />
            </div>
          </div>
          <div className="col-span-2 mt-2">
            <div>
              <label htmlFor="message">Message</label>
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mt-1 rounded-md text-black min-h-[100px]"
              ></textarea>
            </div>
          </div>

          <div className="col-span-2 mt-2 text-center">
            <button
              className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Contact;
