import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { extraData } from "../lib/extraData";
import { Button } from "flowbite-react";
import DataTable from "react-data-table-component";
const apiPort = process.env.REACT_APP_API_PORT;

const ExtraPurchase = () => {
  const [extraList, setExtraList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExtras = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiPort}/api/extra`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch extras");
        }
        const data = await response.json();

        data.forEach((element) => {
          element.extra = extraData[element.serviceId];
        });
        console.log(data);
        setExtraList(data);
      } catch (error) {
        console.error("Error fetching extras:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExtras();
  }, []);
  if (loading) {
    return (
      <Layout titleText={"Extra Purchase"}>
        <div>...Loading</div>
      </Layout>
    );
  }

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Service Name",
      selector: (row) => row.extra.title,
      sortable: true,
    },
    {
      name: "Service Cost",
      selector: (row) => row.extra.cost,
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row) => row.paymentDate.split("T")[0],
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <Button
    //       color="failure"
    //       size="xs"
    //       className="rounded-lg px-4 py-2"
    //       //   onClick={() => handleDeleteMember(row._id)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
  ];
  return (
    <Layout titleText={"Extra Purchase"}>
      <div className="w-full  mx-auto overflow-x-auto">
        <DataTable
          columns={columns}
          data={extraList}
          progressPending={loading}
          highlightOnHover
          responsive
          pagination
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
    </Layout>
  );
};

export default ExtraPurchase;
