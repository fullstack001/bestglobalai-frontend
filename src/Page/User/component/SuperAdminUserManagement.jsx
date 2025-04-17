import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const apiPort = process.env.REACT_APP_API_PORT;

function SuperAdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiPort}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setAllUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiPort}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setAllUsers(updatedUsers);
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Joined Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Email Verified",
      selector: (row) => (row.isActive ? "True" : "False"),
      sortable: true,
    },
    {
      name: "Subscription",
      selector: (row) => (row.subscription ? row.subscription : "Free"),
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: (row) =>
        row.subscriptionExpiry
          ? new Date(row.subscriptionExpiry).toLocaleDateString()
          : "N/A",
      sortable: true,
    },
    {
      name: "Created Video",
      selector: (row) => row.createdVideo,
      sortable: true,
    },
    {
      name: "Transalated Video",
      selector: (row) => row.translatedVideo,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDeleteUser(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:bg-red-600"
        >
          Delete
        </button>
      ),
      button: true,
    },
  ];

  return (
    <div className="w-full overflow-x-auto px-4 py-6 bg-gray-900 min-h-screen text-white">
      <div className="w-full  mx-auto overflow-x-auto">
        <div className="min-w-[768px]">
          <DataTable
            columns={columns}
            data={users}
            pagination
            responsive
            highlightOnHover
            defaultSortField="fullName"
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full max-w-md px-4 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filtered = allUsers.filter(
                    (user) =>
                      user.fullName.toLowerCase().includes(searchTerm) ||
                      user.email.toLowerCase().includes(searchTerm)
                  );
                  setUsers(filtered);
                }}
              />
            }
            selectableRows
            selectableRowsHighlight
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "bold",
                  backgroundColor: "#1f2937", // gray-800
                  color: "#fff",
                },
              },
              rows: {
                style: {
                  backgroundColor: "#111827", // gray-900
                  color: "#e5e7eb", // gray-200
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminUserManagement;
