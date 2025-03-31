import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
// import '../../styles/Users.css';
import { Link, Navigate } from 'react-router-dom';
import { adminAxios } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTerm, setStatusTerm] = useState('');
  const [error, setError] = useState(null);
  const { token } = useAdminAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminAxios.get('/client');
        console.log(response.data.clients)
        setUsers(response.data.clients);
        setFilteredUsers(response.data.clients);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter users whenever search term or status changes
    console.log(searchTerm, statusTerm);
    if (searchTerm.trim() !== '' || statusTerm !== '') {
      const filtered = users.filter(user =>
        (searchTerm.trim() === '' || user.client_nom_complete?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusTerm === '' || user.status_client === statusTerm)
      );
      console.log(filtered);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, statusTerm, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const response = await adminAxios.put(`/client/${userId}/status`, {
        status: newStatus,
      });

      // Update both users and filteredUsers states
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, status_client: newStatus } : user
      );

      setUsers(updatedUsers);

      // Update filteredUsers based on current search term
      if (searchTerm.trim() === '') {
        setFilteredUsers(updatedUsers);
      } else {
        const filtered = updatedUsers.filter(user =>
          user.client_nom_complete?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }

      // Show success message
      alert(`User status updated to: ${newStatus}`);
    } catch (err) {
      console.error('Error updating user status:', err);
      alert('Failed to update user status. Please try again.');
    }
  };

  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className=" mx-auto p-6 min-w-full bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black border-b-2 border-[#57D500] pb-2 inline-block">Users List</h2>
      <div className='flex items-center justify-between gap-2'>
        <div className="mb-6 flex-1/3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
          />
        </div>
        <div className="mb-6 flex-2/3 flex items-center justify-center">
          <span className=''>Status clients:</span>
          <select
            type="text"
            placeholder="Search by name or email..."
            value={statusTerm}
            onChange={(e)=>setStatusTerm(e.target.value)}
            className="flex-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
          >
            <option value="">select status</option>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
      </div>


      {filteredUsers.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-500">No users found matching your search criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom Complete</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id || index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.client_nom_complete || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.client_phone || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${user.status_client === 'approved' ? 'bg-[#57D500] text-white bg-opacity-10' :
                        user.status_client === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                      {user.status_client || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(user.id, 'approved')}
                        className={`p-1.5 rounded-full ${user.status_client === 'approved' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#57D500] text-white hover:bg-opacity-80'}`}
                        title="Approve User"
                        disabled={user.status_client === 'approved'}
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(user.id, 'rejected')}
                        className={`p-1.5 rounded-full ${user.status_client === 'rejected' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-opacity-80'}`}
                        title="Reject User"
                        disabled={user.status_client === 'rejected'}
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>

                      <Link
                        to={`/admin/users/${user.id}`}
                        className="p-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;