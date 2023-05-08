import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddUserComponent from "../../components/users/addUserMain";

const UsersPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddUserComponent />
      </main>
    </>
  );
};

export default UsersPage;
