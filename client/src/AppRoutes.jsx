import React from 'react';
import "./App.css";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

const AppRoutes = () => {

    const Private = ({children}) => {
        let authenticated = localStorage.getItem("userInfo");

        if (!authenticated)
            return <Navigate to="/login" />

        return children;
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={ <LoginPage/> } />
                <Route path="/" element={ <Private><HomePage/></Private> } />
                <Route exact path="/register" element={ <RegisterPage /> } />   
                <Route exact path="/profile" element={ <Private><ProfilePage /></Private> } />
                <Route exact path="/page/:pagenumber" element={ <Private><HomePage /></Private> } />
            </Routes>
        </Router>
    );
}

export default AppRoutes;