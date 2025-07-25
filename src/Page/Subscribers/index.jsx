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
const SubscribersPage = () => {
  const apiPort = process.env.REACT_APP_API_PORT;

  const [subscribers, setSubscribers ] = useState([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]); 
  const [subscriberDetails, setSubscriberDetails] = useState(null); 
  const [shareLink, setShareLink] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        `${apiPort}/api/subscription/subscribers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
      let allSubscribers = response.data;
     
      setSubscribers(allSubscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {  
    fetchSubscribers();   
  }, []);

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.user ?  row.user.fullName : "N/A",
      sortable: true,
    },  
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
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
    <Layout titleText={"Subscribers Dashboard"}>
      <ToastContainer />
      <div className="p-6">       

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
          <h3 className="text-lg font-bold mb-4">Subscribers List</h3>

          {selectedSubscribers.length > 0 && (
            <div className="flex gap-4 mt-4 mb-4 justify-end">            

             
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    if (!shareLink) {
                      toast.error("Please enter a share link.");
                      return;
                    }
                    if (selectedSubscribers.length === 0) {
                      toast.error("Please select subscribers to send invites.");
                      return;
                    }
                    const ids = selectedSubscribers.map((f) => f._id);
                    await axios.post(
                      `${apiPort}/api/subscription/sendBulkInvites`,
                      { subscriberIds: ids, ebookLink: shareLink, },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Invites sent successfully.");
                    setSelectedSubscribers([]);
                  } catch (error) {
                    toast.error("Failed to send invites.");
                  }
                }}
              >
                Send Selected Invites
              </button>            
            </div>
          )}

          <DataTable
            columns={columns}
            data={subscribers}
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
                  setSubscribers(
                    subscribers.filter((subscriber) =>
                      subscriber.email.toLocaleLowerCase().includes(searchTer)
                    )
                  );
                }}
              />
            }
            onSelectedRowsChange={(state) =>
              setSelectedSubscribers(state.selectedRows)
            }
            selectableRows
            selectableRowsHighlight
            customStyles={paginationStyle}
          />
        </div>
      </div>

    
    </Layout>
  );
};

export default SubscribersPage;
