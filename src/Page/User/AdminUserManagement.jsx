import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Layout from "../../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiPort}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiPort}/api/users/role`,
        { userId, role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      setError("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiPort}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Columns for DataTable
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row._id, e.target.value)}
          className="bg-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="editor">Editor</option>
        </select>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDeleteUser(row._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="admin-user-management">
        <h2 className="text-2xl mb-4">User Management</h2>
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          defaultSortField="fullName"
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setUsers(
                  users.filter(
                    (user) =>
                      user.fullName.toLowerCase().includes(searchTerm) ||
                      user.email.toLowerCase().includes(searchTerm)
                  )
                );
              }}
            />
          }
          selectableRows
          selectableRowsHighlight
        />
      </div>
    </Layout>
  );
}

export default AdminUserManagement;
