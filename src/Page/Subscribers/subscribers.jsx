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
const SubscribersTrackPage = () => {
  const apiPort = process.env.REACT_APP_API_PORT;

  const [subscribers, setSubscribers ] = useState([]);
 
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        `${apiPort}/api/subscription/subscription-tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched subscribers:", response.data);
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
      selector: (row) => row.subscriber.user ?  row.subscriber.user.fullName : "N/A",
      sortable: true,
    },  
    {
      name: "Email",
      selector: (row) => row.subscriber.user ?  row.subscriber.user.email : "N/A",
      sortable: true,
    },  
    {
        name: "Books & Views",
        selector: (row) => row.bookStats,
        cell: (row) => (
          <div className="text-sm">
            {row.bookStats && row.bookStats.length > 0 ? (
              row.bookStats.map((book, index) => (
                <div
                  key={index}
                  className="border-b border-gray-600 py-1"
                >
                  <div>Book Title: <strong> {book.bookTitle}</strong></div>
                  <div>Views: {book.viewCount > 0 ? book.viewCount :   "Not Viewed"}</div>
                  {book.viewCount? <div>Last Viewed: {new Date(book.lastUpdatedAt).toLocaleString()}</div>: "" }
                  
                </div>
              ))
            ) : (
              <div>No books sent</div>
            )}
          </div>
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
    <Layout titleText={"Subscribers eBook View Dashboard"}>
      <ToastContainer />
      <div className="p-6">       

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Subscribers Status</h3>         

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
            // onSelectedRowsChange={(state) =>
            //   setSelectedSubscribers(state.selectedRows)
            // }
            selectableRows
            selectableRowsHighlight
            customStyles={paginationStyle}
          />
        </div>
      </div>

    
    </Layout>
  );
};

export default SubscribersTrackPage;
