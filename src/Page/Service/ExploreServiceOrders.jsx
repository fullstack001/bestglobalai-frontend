import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const ExploreServiceOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      let response;
      if (role === "superAdmin") {
        response = await axios.get(
          `${apiPort}/api/service/paginated?page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setServices(response.data.services);
      setTotalPages(response.data.totalServices);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const viewService = (id) => {
    navigate(`/admin/services/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  if (loading) {
    return (
      <Layout titleText={"Service Order Informations"}>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout titleText={"Service Order Informations"}>
      <section className="mt-8">
        <div className=" mt-4">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between w-full mb-2"
              >
                <div>
                  <div className="flex">
                    <div className="mt-2 text-center ml-2">{service.email}</div>
                  </div>
                </div>

                <div>
                  <div className="mt-2 flex justify-between">
                    <button
                      className="mt-3 px-2 py-1 bg-green-500 text-white rounded-lg mr-1 h-fit"
                      onClick={() => viewService(service._id)}
                    >
                      <FontAwesomeIcon icon={faEye} className="" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No service orders available.</p>
          )}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default ExploreServiceOrders;
