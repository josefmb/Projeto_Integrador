import React from "react";

import Header from "../../components/Header";
import Footer from '../../components/Footer';
import ShopSection from "../../components/homeComponents/ShopSection";
import CalltoActionSection from "../../components/homeComponents/CalltoActionSection";
import Pagination from "../../components/homeComponents/pagination";

const HomePage = () => {
    window.scroll(0, 0);

    return (
        <>
            <Header/>
            <ShopSection/>   
            <CalltoActionSection />
            <Pagination />
            <Footer/>
        </>
    );
};

export default HomePage;