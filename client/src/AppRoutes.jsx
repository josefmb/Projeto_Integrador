import React from 'react';
import "./App.css";

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdressPage from './pages/AdressPage';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import PaymentQRCode from './pages/PaymentQRCode';
import VerificaEmail from './pages/RegisterPage/verificaEmail';

const AppRoutes = () => {

    const Private = ({children}) => {
        let authenticated = localStorage.getItem("userInfo");

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={ <LoginPage/> } />
                <Route path="/" element={ <HomePage/> } />
                <Route exact path="/register" element={ <RegisterPage /> } />   
                <Route exact path="/profile" element={ <Private><ProfilePage /></Private> } />
                <Route exact path="/address" element={ <Private><AdressPage /></Private> }></Route>
                <Route exact path="/page/:pagenumber" element={ <HomePage /> } />
                <Route exact path="/product/:id" element={ <SingleProductPage /> } />
                <Route exact path="/cart/:id?" element={ <Private><CartPage /></Private> } />
                <Route exact path="/shipping" element={ <Private><ShippingPage /></Private> }/>
                <Route exact path="/payment" element={ <Private><PaymentPage /></Private> } />
                <Route exact path="/placeorder" element={ <Private><PlaceOrderPage /></Private> } />
                <Route exact path="/paymentQRCode" element={ <Private><PaymentQRCode /></Private> } />
                <Route exact path="/register/:id/verify/:token" element={ <VerificaEmail/> } />
            </Routes>
        </Router>
    );
}

export default AppRoutes;