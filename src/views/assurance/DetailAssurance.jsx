import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { adminAxios } from "../../api/axios";

const DetailAssurance = () => {
    const { id } = useParams();
    const [assurance, setAssurance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminAxios.get(`/assurance/${id}`)
            .then((response) => {
                console.log(response.data)
                setAssurance(response.data.assurance);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching assurance:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Chargement...</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <Link to="/admin/assurances" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <FaArrowLeft className="mr-2" /> Retour à la liste
            </Link>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Détails de l'Assurance</h2>

            <div className="grid grid-cols-2 gap-4">
                <p><strong>Compagnie:</strong> {assurance.company_name}</p>
                <p><strong>Numéro Police:</strong> {assurance.policy_number}</p>
                <p><strong>Date de début:</strong> {assurance.start_date}</p>
                <p><strong>Date de fin:</strong> {assurance.end_date}</p>
                <p><strong>Coût:</strong> {assurance.cost} €</p>
                <p><strong>Statut:</strong>
                    <span className={`ml-2 font-semibold ${assurance.status === "active" ? "text-green-600" : "text-red-600"}`}>
                        {assurance.status === "active" ? "Actif" : "Expiré"}
                    </span>
                </p>
            </div>

            <Link to={`/admin/assurances/edit/${id}`} className="block mt-6 text-center bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                ✏️ Modifier Assurance
            </Link>
        </div>
    );
};

export default DetailAssurance;
