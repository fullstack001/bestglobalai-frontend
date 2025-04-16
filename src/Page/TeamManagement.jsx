import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal, TextInput, Label } from "flowbite-react";

import Layout from "../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;

function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "" });

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.post(
          `${apiPort}/api/users/get-team-users`,
          { email },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  const handleAddMember = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiPort}/api/users/add-team-user`,
        {
          ownerEmail: email,
          memberName: newMember.name,
          memberEmail: newMember.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTeamMembers([...teamMembers, response.data]);
      setShowAddModal(false);
      setNewMember({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiPort}/api/users/delete-team-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers(teamMembers.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.memberName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.memberEmail,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          color="failure"
          size="xs"
          className="rounded-lg px-4 py-2"
          onClick={() => handleDeleteMember(row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout titleText={"User Management"}>
      <div className="p-4 mt-6">
        <Button
          style={{ backgroundColor: "#4CAF50", color: "white" }}
          onClick={() => setShowAddModal(true)}
          className="mb-4 rounded-lg px-4 py-2 ml-auto"
        >
          Add Member
        </Button>
        <DataTable
          columns={columns}
          data={teamMembers}
          progressPending={loading}
          highlightOnHover
          responsive
        />

        {/* Add Member Modal */}
        <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
          <Modal.Header>
            <h3 className="text-lg font-semibold">Add Team Member</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Enter valid email address"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="rounded-lg"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="gray"
              onClick={() => setShowAddModal(false)}
              className="rounded-lg px-4 py-2"
            >
              Close
            </Button>
            <Button
              color="primary"
              onClick={handleAddMember}
              className="rounded-lg px-4 py-2"
            >
              Add Member
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}

export default TeamManagement;
