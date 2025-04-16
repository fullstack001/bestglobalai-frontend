import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";

import { Modal, Button, Label, Textarea } from "flowbite-react";

const apiPort = process.env.REACT_APP_API_PORT;

const ExploreContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedContactId, setSelectedContactId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);

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
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const viewContact = (id) => {
    navigate(`/admin/contacts/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const handleReply = (id) => {
    setSelectedContactId(id);
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const submitReply = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiPort}/api/contacts/reply/${selectedContactId}`,
        { message: replyMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowReplyModal(false);
      fetchContacts(currentPage);
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteContactId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiPort}/api/contacts/${deleteContactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowDeleteModal(false);
      fetchContacts(currentPage);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout titleText="Contact Informations">
      <section className="mt-8">
        <div className="mt-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between w-full mb-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-white text-lg font-semibold">
                      {contact.firstName} {contact.lastName}
                    </div>
                    {contact.replied ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Replied
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        Not Replied
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-white">{contact.email}</div>
                  <div className="mt-1 text-white">{contact.phone}</div>
                </div>

                <div className="flex flex-row justify-between items-center gap-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded-md"
                    onClick={() => viewContact(contact._id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                    onClick={() => handleReply(contact._id)}
                  >
                    Reply
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded-md"
                    onClick={() => confirmDelete(contact._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No contacts available.</p>
          )}
        </div>
      </section>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg text-white">
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

      {/* Reply Modal */}
      <Modal show={showReplyModal} onClose={() => setShowReplyModal(false)}>
        <Modal.Header>Reply to Contact</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Label htmlFor="message" value="Your Message" />
            <Textarea
              id="message"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={5}
              placeholder="Type your reply..."
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitReply}>Send</Button>
          <Button color="gray" onClick={() => setShowReplyModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this contact?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteConfirmed}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default ExploreContact;
