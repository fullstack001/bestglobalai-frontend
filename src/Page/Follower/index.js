import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { FaTimes, FaEye } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../components/Layout";

Modal.setAppElement("#root");
const FollowersPage = () => {
  const apiPort = process.env.REACT_APP_API_PORT;

  const [followers, setFollowers] = useState([]);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [inviteLink, setInviteLink] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [followerDetails, setFollowerDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      let allFollowers = response.data.followers;
     
      setFollowers(allFollowers);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowersByCategory = async (categoryId) => {
    try {
      const response = await axios.post(
        `${apiPort}/api/followers/category`,
        { categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(response.data.followers);
    } catch (error) {
      console.error("Error fetching followers by category:", error);
      toast.error("Failed to fetch followers by category.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiPort}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories");
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
    fetchCategories();
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

  const uploadHubspotCsv = async () => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("csvFile", file);
    try {
      const response = await axios.post(
        `${apiPort}/api/followers/uploadHubspotFollowers`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
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
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
      fetchFollowers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
    }
  };
  const handleInvite = async (followerId) => {
    try {
      const response = await axios.post(
        `${apiPort}/api/followers/sendInvites/${followerId}`,
        {ebookLink: shareLink},
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
      name: "Category",
      selector: (row) =>
        categories.find(
          (cat) => cat._id === (row.category?._id || row.category)
        )?.name || "",
      sortable: true,
      cell: (row) => (
        <select
          value={row.category?._id || row.category}
          onChange={async (e) => {
            try {
              await axios.post(
                `${apiPort}/api/followers/updateCategory`,
                {
                  followerId: row._id,
                  categoryId: e.target.value,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              toast.success("Category updated.");
              fetchFollowersByCategory(selectedCategory);
            } catch (err) {
              toast.error("Failed to update category.");
            }
          }}
          className="p-1 rounded border"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      ),
    },
   
    {
      name: "eBook Viewed",
      selector: (row) => row.viewed,
      cell: (row) => {
        if (row.viewed === true) {
          return <span className="text-green-600 text-lg">✔️</span>;
        } else if (row.viewed === false) {
          return <span className="text-red-600 text-lg">❌</span>;
        } else {
          return <span className="text-gray-500 italic">Not Sent</span>;
        }
      },
      sortable: true,
    },
    {
      name: "Last Read",
      selector: (row) => row.updatedAt || "",
      cell: (row) => {
        if (row.viewed === true && row.updatedAt) {
          return <span className="text-gray-800">{row.updatedAt}</span>;
        } else if (row.viewed === false) {
          return <span className="text-gray-400 italic">—</span>;
        } else {
          return <span className="text-gray-500 italic">Not Sent</span>;
        }
      },
      sortable: true,
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
    <Layout titleText={"Followers"}>
      <ToastContainer />
      <div className="p-6">
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
          <p className="mb-1">Your Share eBook Link:</p>
          <div className="flex">
            <input
              className="flex-grow p-2 border text-gray-700 rounded-l"
              value={shareLink}
              onChange={(e) => setShareLink(e.target.value)}
               placeholder="Paste eBook link here"
            />
            
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mt-6">Upload Followers CSV</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />         

          <button
            onClick={uploadHubspotCsv}
            className="bg-green-500 text-white px-4 py-2 mt-2"
          >
            Upload Leads CSV
          </button>
        </div>

        <div className="flex justify-end items-center mb-4 gap-4">
          <label className="text-sm font-medium">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const selected = e.target.value;
              setSelectedCategory(selected);
              fetchFollowersByCategory(selected);
            }}
            className="p-2 border rounded text-gray-700"
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Follower List</h3>

          {selectedFollowers.length > 0 && (
            <div className="flex gap-4 mt-4 mb-4 justify-end">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded text-gray-700"
              >
                <option value="all">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  if (selectedCategory === "all") {
                    toast.error("Please select a valid category.");
                    return;
                  }
                  try {
                    const ids = selectedFollowers.map((f) => f._id);
                    await axios.post(
                      `${apiPort}/api/followers/bulkUpdateCategory`,
                      { followerIds: ids, categoryId: selectedCategory },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Categories assigned successfully.");
                    setSelectedFollowers([]);
                    fetchFollowersByCategory(selectedCategory);
                  } catch (err) {
                    toast.error("Failed to assign categories.");
                  }
                }}
              >
                Assign Category
              </button>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    if (!shareLink) {
                      toast.error("Please enter a share link.");  
                      return;
                    }
                    const ids = selectedFollowers.map((f) => f._id);
                    await axios.post(
                      `${apiPort}/api/followers/sendBulkInvites`,
                      { followerIds: ids, ebookLink: shareLink, },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Bulk invites sent successfully.");
                    setSelectedFollowers([]);
                  } catch (error) {
                    toast.error("Failed to send invites.");
                  }
                }}
              >
                Send Selected Invites
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const ids = selectedFollowers.map((f) => f._id);
                    await axios.post(
                      `${apiPort}/api/followers/deleteBulkFollowers`,
                      { followerIds: ids },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Followers deleted.");
                    setSelectedFollowers([]); // Clear selection after deletion
                    fetchFollowers(); // Refresh table
                  } catch (error) {
                    toast.error("Failed to delete followers.");
                  }
                }}
              >
                Delete Selected
              </button>
            </div>
          )}

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
            onSelectedRowsChange={(state) =>
              setSelectedFollowers(state.selectedRows)
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
            <h2 className="text-2xl font-bold">Follower Details</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-600"
            >
              <FaTimes />
            </button>
          </div>
          {followerDetails && (
            <div className="mt-4">
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
          {/* <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button> */}
        </div>
      </Modal>
    </Layout>
  );
};

export default FollowersPage;
