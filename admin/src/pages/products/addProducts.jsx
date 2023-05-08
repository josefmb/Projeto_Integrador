import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddProductMain from "../../components/products/addProductMain";

const AddProductPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProductPage;
