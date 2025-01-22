import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const ContactViewer = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const previousLocaction =
    currentLocation.state?.previousUrl || "No previous URL";

  const returnBack = () => {
    if (previousLocaction === "/admin/contacts") {
      navigate("/admin/contacts");
    }
  };

  useEffect(() => {
    const fetchContactDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiPort}/api/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const contact = response.data.contact;

        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.email);
        setPhone(contact.phone);
        setContent(contact.content);
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchContactDetails();
  }, [id]);

  return (
    <Layout>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={returnBack}
        >
          Back
        </button>
      </div>
      <div className="mt-4">
        <span>Name: </span> {firstName} {lastName}
      </div>
      <div className="mt-2">
        <span>Email: </span>
        {email}
      </div>
      <div className="mt-2">
        <span>Phone: </span>
        {phone}
      </div>
      <div className="mt-2">
        <div>Message</div>
        <div>{content}</div>
      </div>
    </Layout>
  );
};

export default ContactViewer;
