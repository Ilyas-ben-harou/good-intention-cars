import { useNavigate, useParams } from "react-router-dom";
import { adminAxios } from "../../api/axios";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ArrowBigLeft } from "lucide-react";

const DetailVisit = () => {
    const [visit, setVisit] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        const fetchVisit = async () => {
            try {
                const response = await adminAxios.get(`/technical-visits/${id}`);
                const data = response.data

                if (data.success) {
                    setVisit(data.visit);
                } else {
                    setError(data.message || "Erreur inconnue");
                }
            } catch (error) {
                setError("Erreur lors de la récupération de la visite technique");
            }
        };

        fetchVisit();
    }, [id]);

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!visit) {
        return <p className="text-center text-gray-500">Chargement...</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Détails de la Visite Technique</h2>
            <div className="space-y-2">
                <p className="text-gray-600">
                    <span className="font-medium">ID de la voiture :</span> {visit.car.id}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Marque de la voiture :</span> {visit.car.marque}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Modèle de la voiture :</span> {visit.car.modele}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Date de visite :</span> {visit.visit_date}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Date d'expiration :</span> {visit.expiration_date}
                </p>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                >
                    <ArrowBigLeft className="mr-2" />
                    Back
                </button>
            </div>
        </div>
    );
};

export default DetailVisit;
