import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const ExploreContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      let response;
      if (role === "superAdmin") {
        response = await axios.get(
          `${apiPort}/api/contacts/paginated?page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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

  const viewContact = (id) => {
    navigate(`/admin/contacts/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  return (
    <Layout>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Contact Informations</h2>

        <div className=" mt-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between w-full mb-2"
              >
                <div>
                  <div className="flex">
                    <div className="mt-2 text-center ml-2">
                      {contact.firstName} {contact.lastName}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mt-2 text-center ml-2">{contact.email}</div>
                  </div>
                  <div className="flex">
                    <div className="mt-2 text-center ml-2">{contact.phone}</div>
                  </div>
                </div>

                <div>
                  <div className="mt-2 flex justify-between">
                    <button
                      className="mt-3 px-2 py-1 bg-green-500 text-white rounded-lg mr-1 h-fit"
                      onClick={() => viewContact(contact._id)}
                    >
                      <FontAwesomeIcon icon={faEye} className="" />
                    </button>

                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
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

export default ExploreContact;
