import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MainProducts from "../../components/products/mainProducts";
import Pagination from "../../components/products/Pagination";

const ProductPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
        <Pagination />
      </main>
    </>
  );
};

export default ProductPage;
