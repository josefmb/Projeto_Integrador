import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import EditUserMain from "../../components/users/editUserMain";

const EditUserPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUserMain />
      </main>
    </>
  );
};
export default EditUserPage;
