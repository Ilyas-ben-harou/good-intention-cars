import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { adminAxios } from "../../api/axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
// import '../../styles/DetailReservation.css'

const DetailReservation = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservation();
    }, []);

    // Récupérer les détails de la réservation
    const fetchReservation = async () => {
        try {
            const response = await adminAxios.get(`/reservation/${id}`);
            setReservation(response.data.reservation);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails", error);
            setLoading(false);
        }
    };
    const { token } = useAdminAuth()
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!reservation) {
        return <div className="error">Réservation introuvable.</div>;
    }
    console.log(reservation)
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-black border-b-2 border-[#57D500] pb-2 inline-block">
                    Détails de la Réservation #{reservation.id}
                </h2>
                <Link to="/admin/reservations" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
                    <FaArrowLeft className="w-4 h-4" /> Retour
                </Link>
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                {/* Client Information Section */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#57D500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Informations du Client
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Nom complete</p>
                            <p className="font-medium">{reservation.client_nom_complete}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Phone</p>
                            <p className="font-medium">{reservation.client_phone}</p>
                        </div>
                    </div>
                </div>

                {/* Car Information Section */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#57D500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Informations sur la Voiture
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Marque</p>
                            <p className="font-medium">{reservation.car_marque}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Modèle</p>
                            <p className="font-medium">{reservation.car_modele}</p>
                        </div>

                    </div>
                </div>

                {/* Reservation Details Section */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#57D500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Détails de la Réservation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date de début</p>
                            <p className="font-medium">
                                {format(new Date(reservation.date_debut), 'dd MMMM yyyy', { locale: fr })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date de fin</p>
                            <p className="font-medium">
                                {format(new Date(reservation.date_fin), 'dd MMMM yyyy', { locale: fr })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Montant total</p>
                            <p className="font-medium">{reservation.montantTotal} €</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Statut</p>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
            ${reservation.status === 'completed' ? 'bg-[#57D500] bg-opacity-10 text-[#ffffff]' :
                                    reservation.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'}`}>
                                {reservation.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Paiement</p>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
            ${reservation.payment_status === 'made' ? 'bg-[#57D500] bg-opacity-10 text-[#ffffff]' :
                                    'bg-red-100 text-red-800'}`}>
                                {reservation.payment_status === "not made" ? "Non payé" : "Payé"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailReservation;
