import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import '../../styles/DetailUser.css'; // Make sure to create this CSS file to style the user details page
import { adminAxios } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';

const DetailUser = () => {
    const { id } = useParams();  // Get the id from the URL
    const navigate = useNavigate();  // For navigation
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data based on id
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await adminAxios.get(`client/${id}`);
                setUser(response.data.client);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Failed to load user details. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);
    const {token}=useAdminAuth()
if (!token) {
    return <Navigate to="/admin/login" />;
  }
    // If loading, show a loading message
    if (loading) {
        return <div className="loading-container">Loading user details...</div>;
    }

    // If error occurs
    if (error) {
        return <div className="error-container">{error}</div>;
    }

    // Render the user details
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-black border-b-2 border-[#57D500] pb-2 inline-block">User Details</h2>
  
  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-3 border-b border-gray-200 md:border-b-0 md:border-r">
        <p className="text-sm text-gray-500 mb-1">ID</p>
        <p className="font-medium text-black">{user.id}</p>
      </div>
      
      <div className="p-3 border-b border-gray-200 md:border-b-0">
        <p className="text-sm text-gray-500 mb-1">Name</p>
        <p className="font-medium text-black">{user.client_nom_complete}</p>
      </div>      
      <div className="p-3 border-b border-gray-200 md:border-b-0">
        <p className="text-sm text-gray-500 mb-1">Phone</p>
        <p className="font-medium text-black">{user.client_phone}</p>
      </div>
      
      <div className="p-3 md:col-span-2">
        <p className="text-sm text-gray-500 mb-1">Status</p>
        <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full 
          ${user.status_client === 'approved' ? 'bg-[#57D500] bg-opacity-10 text-[#ffffff]' : 
            user.status_client === 'rejected' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {user.status_client}
        </span>
      </div>
      
      {/* You can add more user details here following the same pattern */}
    </div>
  </div>
  
  <button 
    onClick={() => navigate(-1)} 
    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Back
  </button>
</div>
    );
};

export default DetailUser;
