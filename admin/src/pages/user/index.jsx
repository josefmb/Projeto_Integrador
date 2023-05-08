import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import UserComponent from "../../components/users/userComponent";
import Pagination from "../../components/products/Pagination";

const UsersPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent />
        <Pagination />
      </main>
    </>
  );
};

export default UsersPage;
