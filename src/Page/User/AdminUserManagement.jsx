import React from "react";

import SuperAdminUserManagement from "./component/SuperAdminUserManagement";
import OtherAdminUserManagement from "./component/OtherAdminUserManagement";
import Layout from "../../components/Layout";

function AdminUserManagement() {
  const role = localStorage.getItem("role");
  const isSuperAdmin = role === "superAdmin";

  return (
    <Layout titleText={"User Management"}>
      {isSuperAdmin ? (
        <SuperAdminUserManagement />
      ) : (
        <OtherAdminUserManagement />
      )}
    </Layout>
  );
}

export default AdminUserManagement;
