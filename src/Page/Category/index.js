import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/Layout";
import { FaEdit, FaTrash } from "react-icons/fa";

Modal.setAppElement("#root");

const CategoriesPage = () => {
  const apiPort = process.env.REACT_APP_API_PORT;
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiPort}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category = null) => {
    if (category) {
      setIsEditing(true);
      setEditingCategory(category);
      setName(category.name);
    } else {
      setIsEditing(false);
      setName("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
    setEditingCategory(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `${apiPort}/api/categories/${editingCategory._id}`,
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Category updated.");
      } else {
        await axios.post(
          `${apiPort}/api/categories`,
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Category created.");
      }

      fetchCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;

    try {
      await axios.delete(`${apiPort}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted.");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Default",
      cell: (row) => (row.isDefault ? "✅" : "❌"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => openModal(row)}
          >
            <FaEdit />
          </button>
          {!row.isDefault && (
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(row._id)}
            >
              <FaTrash />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout titleText="Manage Categories">
      <ToastContainer />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categories</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + New Category
          </button>
        </div>

        <DataTable
          columns={columns}
          data={categories}
          pagination
          highlightOnHover
        />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Category" : "New Category"}
            </h3>
            <input
              className="w-full p-2 border rounded mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
