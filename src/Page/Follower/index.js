import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { FaTimes, FaEye } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../components/Layout"; // Adjust the path as needed

Modal.setAppElement("#root");
const FollowersPage = () => {
  const apiPort = process.env.REACT_APP_API_PORT;

  const [followers, setFollowers] = useState([]);
  const [inviteLink, setInviteLink] = useState("");
  const [file, setFile] = useState(null);
  const [followerDetails, setFollowerDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `${apiPort}/api/followers/all/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(response.data.followers);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    const fetchInviteLinks = async () => {
      try {
        const response = await axios.get(
          `${apiPort}/api/followers/generateInvite/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInviteLink(response.data.referralLink);
      } catch (error) {
        console.error("Error fetching invite links:", error);
      }
    };

    fetchInviteLinks();
    fetchFollowers();
  }, []);

  const uploadCSV = async () => {
    if (!file) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">No file selected.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("inviterId", userId);

    const response = await axios.post(
      `${apiPort}/api/followers/uploadFollowers`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(
      //show success message
      <div className="custom-toast flex">
        <div className="custom-icon">✔️</div>
        <div className="mt-4">{response.data.message}</div>
      </div>,
      {
        className: "success-toast",
        autoClose: 3000,
        hideProgressBar: true,
      }
    );
    fetchFollowers();
  };

  const handleInvite = async (followerId) => {
    try {
      const response = await axios.post(
        `${apiPort}/api/followers/sendInvites/${followerId}`,
        {},
        {
          // Added empty object for data
          headers: { Authorization: `Bearer ${token}` }, // Correctly placed headers
        }
      );
      toast.success(
        //show success message
        <div className="custom-toast flex">
          <div className="custom-icon">✔️</div>
          <div className="mt-4">{response.data.message}</div>
        </div>,
        {
          className: "success-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      fetchFollowers();
    } catch (error) {
      console.error("Error inviting follower:", error);
    }
  };

  const viewFollower = async (followerId) => {
    const response = await axios.get(`${apiPort}/api/followers/${followerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const followerDetails = response.data;

    // Assuming you have a state to control the modal visibility and another to store the follower details
    setFollowerDetails(followerDetails);
    setIsModalOpen(true);
    console.log(response);
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={
            row.status === "Pending" ? "text-red-600" : "text-green-600"
          }
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Invite",
      cell: (row) => (
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => handleInvite(row._id)}
        >
          Send Invite
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => viewFollower(row._id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          <FaEye />
        </button>
      ),
    },
  ];

  const paginationStyle = {
    pagination: {
      style: {
        display: "flex",
        justifyContent: "flex-start", // Aligns pagination to the left
        padding: "10px",
      },
    },
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">My Followers</h2>

        <div className="mt-2">
          <p className="mb-1">Your Invite Link:</p>
          <div className="flex">
            <input
              className="flex-grow p-2 border text-gray-700 rounded-l"
              value={inviteLink}
              readOnly
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
                toast.success("Invite link copied to clipboard!");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mt-6">Upload Followers CSV</h3>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={uploadCSV}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Upload Followers CSV
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Follower List</h3>

          <DataTable
            columns={columns}
            data={followers}
            pagination
            highlightOnHover
            defaultSortFieldId="email"
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search by email"
                className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
                onChange={(e) => {
                  const searchTer = e.target.value.toLocaleLowerCase();
                  setFollowers(
                    followers.filter((follower) =>
                      follower.email.toLocaleLowerCase().includes(searchTer)
                    )
                  );
                }}
              />
            }
            selectableRows
            selectableRowsHighlight
            customStyles={paginationStyle}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Follower Details"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Followr Details</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-600"
            >
              <FaTimes />
            </button>
          </div>
          {followerDetails && (
            <div>
              <p>
                <strong>First Name:</strong> {followerDetails.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {followerDetails.lastName}
              </p>

              <p>
                <strong>Company Name:</strong> {followerDetails.companyName}
              </p>
              <p>
                <strong>Address:</strong> {followerDetails.address}
              </p>
              <p>
                <strong>City:</strong> {followerDetails.city}
              </p>
              <p>
                <strong>Country:</strong> {followerDetails.country}
              </p>
              <p>
                <strong>State:</strong> {followerDetails.state}
              </p>
              <p>
                <strong>Zip:</strong> {followerDetails.zip}
              </p>
              <p>
                <strong>Phone1:</strong> {followerDetails.phone1}
              </p>
              <p>
                <strong>Phone2:</strong> {followerDetails.phone2}
              </p>
              <p>
                <strong>Email:</strong> {followerDetails.email}
              </p>
              <p>
                <strong>Status:</strong> {followerDetails.status}
              </p>

              {/* Add more fields as necessary */}
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default FollowersPage;
