import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const ServiceOrderViewer = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const previousLocaction =
    currentLocation.state?.previousUrl || "No previous URL";

  const returnBack = () => {
    if (previousLocaction === "/admin/services") {
      navigate("/admin/services");
    }
  };

  useEffect(() => {
    const fetchContactDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiPort}/api/service/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const service = response.data.service;
        setEmail(service.email);
        setContent(service.selectedAPIs);
      } catch (error) {
        console.error("Error loading service order details:", error);
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

      <div className="mt-2">
        <div className="text-xl">Email: </div>
        <div className="mt-2">{email}</div>
      </div>

      <div className="mt-2">
        <div className="text-xl">Service Order details</div>
        <div className="mt-2">
          {content.length > 0 ? (
            <ul>
              {content.map((item, index) => (
                <li key={index}>
                  <a href={item.link} target="_blank">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "No service orders available."
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServiceOrderViewer;
