import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        Em manutenção...
      </main>
    </>
  );
};

export default HomePage;
