import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Header from './assets/Header';
import SideBar from './assets/SideBar';
import { adminAxios } from '../../api/axios';

const AdminProtectedRoute = () => {
    const { admin, loading } = useAdminAuth();
    const [Token, setToken] = useState(localStorage.getItem('admin_token'));
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const updateStatus = async () => {
            try {
                await adminAxios.get('/update-insurance-status')
                await adminAxios.get('/update-car-status')
            } catch (error) {
                console.error('Error:', error);
            }
        };
        updateStatus();
    }, []);
    useEffect(() => {
        setToken(localStorage.getItem('admin_token'));
    }, [localStorage.getItem('admin_token')]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!Token) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <div className="admin-container min-h-screen">
            {/* Fixed header on both layouts */}
            <div className="fixed top-0 left-0 right-0 z-30">
                <Header name={admin?.prenom} />
            </div>

            <div className="pt-16"> {/* Adjust based on header height */}
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar - normal flow on mobile, fixed on desktop */}
                    <div className={`bg-black text-white ${isMobile
                            ? 'w-full' // Full width on mobile
                            : 'fixed top-16 left-0 bottom-0 w-64 z-20' // Fixed on desktop (below header)
                        }`}>
                        <SideBar />
                    </div>

                    {/* Main content */}
                    <div className={`${isMobile ? 'w-full' : 'ml-64 w-full'}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProtectedRoute;