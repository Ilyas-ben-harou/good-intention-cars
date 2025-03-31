import React, { useEffect, useState } from 'react'
import { FaBell, FaUser, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../../context/AdminAuthContext';

const Header = ({ name }) => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const onLogout = async () => {
        await logout();
        navigate('/admin/login');
    };
    
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-black text-white shadow-md">
            <h1 className="text-xl md:text-2xl font-bold">
                <span className="text-[#57D500]">GOOD INTENTION</span> CARS - ADMIN
            </h1>

            <div className="flex items-center space-x-4">
                {/* User Dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 bg-[#57D500] hover:bg-[#4fb700] text-black font-medium py-2 px-4 rounded-md transition-colors "
                        
                        aria-expanded={dropdownOpen}
                    >
                        <FaUser className="text-black" />
                        <span>{name}</span>
                        <FaAngleDown
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className={`hover:cursor-pointer transition-transform size-5 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}/>
                    </button>

                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 py-1">
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors flex items-center space-x-2"
                                    onClick={onLogout}
                                >
                                    <FaSignOutAlt />
                                    <span>Déconnexion</span>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;