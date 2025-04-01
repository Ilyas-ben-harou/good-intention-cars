import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FaCar, FaUserAlt, FaCalendarCheck, FaMoneyBillWave } from 'react-icons/fa';

import { adminAxios } from '../../api/axios';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardAdmin = () => {
    // State to store dashboard data
    const [stats, setStats] = useState({
        totalCars: 0,
        availableCars: 0,
        totalClients: 0,
        pendingClients: 0,
        totalReservations: 0,
        activeReservations: 0,
        totalRevenue: 0,
        monthlyRevenue: []
    });
    const [recentRes, setRecentRes] = useState()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // You'll need to create these endpoints in your Laravel backend
                const [carsRes, clientsRes, reservationsRes, revenueRes, recentReservationRes] = await Promise.all([
                    adminAxios.get('/stats/cars'),
                    adminAxios.get('/stats/clients'),
                    adminAxios.get('/stats/reservations'),
                    adminAxios.get('/stats/revenue'),
                    adminAxios.get('/stats/recentRes'),
                ]);

                setStats({
                    totalCars: carsRes.data.total,
                    availableCars: carsRes.data.available,
                    totalClients: clientsRes.data.total,
                    pendingClients: clientsRes.data.pending,
                    totalReservations: reservationsRes.data.total,
                    activeReservations: reservationsRes.data.active,
                    totalRevenue: revenueRes.data.total,
                    monthlyRevenue: revenueRes.data.monthly
                });
                setRecentRes(recentReservationRes.data)

                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Chart data for car status
    const carStatusData = {
        labels: ['Available', 'Rented'],
        datasets: [
            {
                data: [stats.availableCars, stats.totalCars - stats.availableCars],
                backgroundColor: ['#4CAF50', '#FFA000'],
                borderWidth: 1,
            },
        ],
    };

    // Chart data for client status
    const clientStatusData = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                data: [
                    stats.totalClients - stats.pendingClients,
                    stats.pendingClients,
                    0 // This would need to be fetched from your API
                ],
                backgroundColor: ['#4CAF50', '#FFA000', '#F44336'],
                borderWidth: 1,
            },
        ],
    };

    // Chart data for monthly revenue
    const monthlyRevenueData = {
        labels: stats.monthlyRevenue.map(item => item.month),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: stats.monthlyRevenue.map(item => item.amount),
                backgroundColor: '#3498db',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue',
            },
        },
    };

    if (loading) {
        return (
            <div className="loading-container flex items-center justify-center h-screen">
                <div className="spinner w-12 h-12 border-4 border-t-[#57D500] border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container flex flex-col items-center justify-center h-screen p-4 bg-red-50 text-center">
                <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
                <p className="text-gray-700 mb-4">{error}</p>
                <button
                    className="btn bg-[#57D500] text-white px-4 py-2 rounded-md hover:bg-[#4ab000] transition-colors"
                    onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard p-6 max-w-7xl mx-auto">
            <h1 className="dashboard-title text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-start">
                    <div className="stat-icon car-icon bg-[#57D500]/10 text-[#57D500] p-4 rounded-full mr-4">
                        <FaCar size={24} />
                    </div>
                    <div className="stat-details">
                        <h3 className="font-semibold text-lg text-gray-800">Cars</h3>
                        <p className="text-gray-600">{stats.totalCars} Total</p>
                        <p className="text-gray-600">{stats.availableCars} Available</p>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-start">
                    <div className="stat-icon client-icon bg-blue-100 text-blue-500 p-4 rounded-full mr-4">
                        <FaUserAlt size={24} />
                    </div>
                    <div className="stat-details">
                        <h3 className="font-semibold text-lg text-gray-800">Clients</h3>
                        <p className="text-gray-600">{stats.totalClients} Total</p>
                        <p className="text-gray-600">{stats.pendingClients} Pending</p>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-start">
                    <div className="stat-icon reservation-icon bg-purple-100 text-purple-500 p-4 rounded-full mr-4">
                        <FaCalendarCheck size={24} />
                    </div>
                    <div className="stat-details">
                        <h3 className="font-semibold text-lg text-gray-800">Reservations</h3>
                        <p className="text-gray-600">{stats.totalReservations} Total</p>
                        <p className="text-gray-600">{stats.activeReservations} Active</p>
                    </div>
                </div>

                <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-start">
                    <div className="stat-icon revenue-icon bg-green-100 text-green-500 p-4 rounded-full mr-4">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div className="stat-details">
                        <h3 className="font-semibold text-lg text-gray-800">Revenue</h3>
                        <p className="text-gray-600">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="chart-card bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Car Status</h3>
                    <div className="chart-wrapper h-64">
                        <Pie data={carStatusData} />
                    </div>
                </div>

                <div className="chart-card bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Client Status</h3>
                    <div className="chart-wrapper h-64">
                        <Pie data={clientStatusData} />
                    </div>
                </div>

                <div className="chart-card full-width bg-white rounded-lg shadow-md p-6 md:col-span-2">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Monthly Revenue</h3>
                    <div className="chart-wrapper h-80">
                        <Bar data={monthlyRevenueData} options={barOptions} />
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="recent-activity bg-white rounded-lg shadow-md p-6">
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Recent Reservations</h2>
                <div className="activity-table-container overflow-x-auto">
                    <table className="activity-table w-full min-w-max">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Car</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentRes?.length > 0 ? (
                                recentRes.map((res) => (
                                    <tr key={res.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.client_id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.car_id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.date_debut}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.date_fin}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${res.status === 'active' ? 'bg-green-100 text-green-800' : ''} 
                                                    ${res.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''} 
                                                    ${res.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}`
                                                }>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${res.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                                                res.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {res.payment_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">No recent reservations found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;