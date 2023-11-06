import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddWarehouseMain from "../../components/warehouse/addWareHouse";

const AddWarehousePage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddWarehouseMain />
      </main>
    </>
  );
};

export default AddWarehousePage;
