import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminAxios } from '../../api/axios';
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ListVisits = () => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'expired', 'expiring'
    const navigate = useNavigate();

    useEffect(() => {
        fetchVisits();
    }, [filter]);

    const fetchVisits = async () => {
        try {
            setLoading(true);
            let endpoint = '/technical-visits';

            if (filter === 'expired') {
                endpoint = '/technical-visits/expired';
            } else if (filter === 'expiring') {
                endpoint = '/technical-visits/expiring-soon';
            }

            const response = await adminAxios.get(endpoint);
            setVisits(response.data.visits);
            setError(null);
        } catch (err) {
            console.error('Error fetching technical visits:', err);
            setError('Failed to load technical visits. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette visite technique ?')) {
            return;
        }

        try {
            await adminAxios.delete(`/technical-visits/${id}`);
            setVisits(visits.filter(visit => visit.id !== id));
        } catch (err) {
            console.error('Error deleting technical visit:', err);
            alert('Failed to delete technical visit. Please try again.');
        }
    };

    const getStatusBadge = (visit) => {
        const today = new Date();
        const expirationDate = new Date(visit.expiration_date);
        const daysUntil = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

        if (daysUntil < 0) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    <FaExclamationTriangle className="mr-1" />
                    Expiré
                </span>
            );
        } else if (daysUntil <= 30) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    <FaExclamationTriangle className="mr-1" />
                    Expire dans {daysUntil} jour(s)
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <FaCheckCircle className="mr-1" />
                    Valide
                </span>
            );
        }
    };

    if (loading) {
        return <div className="text-center py-8">Chargement des visites techniques...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    return (
        <div className="mt-3 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Visites Techniques</h1>
                <Link
                    to="/admin/technical-visits/create"
                    className="inline-flex items-center px-4 py-2 bg-[#57D500] text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                    <FaPlus className="mr-2" />
                    Nouvelle Visite
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex border-b p-4">
                    <button
                        className={`px-4 py-2 rounded-md mr-2 ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                        onClick={() => setFilter('all')}
                    >
                        Toutes
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md mr-2 ${filter === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100'}`}
                        onClick={() => setFilter('active')}
                    >
                        Valides
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md mr-2 ${filter === 'expiring' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}
                        onClick={() => setFilter('expiring')}
                    >
                        Expirant bientôt
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'expired' ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
                        onClick={() => setFilter('expired')}
                    >
                        Expirées
                    </button>
                </div>
            </div>

            {visits.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Aucune visite technique trouvée.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Véhicule
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date de visite
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expiration
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {visits.map((visit) => (
                                <tr key={visit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">
                                            {visit.car?.marque} {visit.car?.modele}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {visit.car?.immatriculation}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {format(new Date(visit.visit_date), 'dd MMMM yyyy', { locale: fr })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {format(new Date(visit.expiration_date), 'dd MMMM yyyy', { locale: fr })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(visit)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/admin/technical-visits/edit/${visit.id}`}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <FaEdit className="inline" />
                                        </Link>
                                        <Link
                                            to={`/admin/technical-visits/${visit.id}`}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <FaEye className="inline" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(visit.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash className="inline" />
                                        </button>
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

export default ListVisits;