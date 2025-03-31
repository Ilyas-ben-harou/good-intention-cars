import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';


const ClinetProtectedRoute = () => {    
    return (
        <>
        <NavBar/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </>
    )
};

export default ClinetProtectedRoute;