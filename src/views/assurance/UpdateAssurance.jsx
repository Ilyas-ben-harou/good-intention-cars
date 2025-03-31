import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminAxios } from "../../api/axios";

const UpdateAssurance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assurance, setAssurance] = useState({
        company_name: "",
        policy_number: "",
        start_date: "",
        end_date: "",
        cost: "",
        status: "active",
    });

    useEffect(() => {
        adminAxios.get(`/assurance/${id}`)
            .then((response) => {
                const data = response.data.assurance;
                setAssurance({
                    ...data,
                    start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : "",
                    end_date: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : "",
                });
            })
            .catch((error) => console.error("Error fetching assurance:", error));
    }, [id]);

    const handleChange = (e) => {
        setAssurance({ ...assurance, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        adminAxios.put(`/assurance/${id}`, assurance)
            .then(() => navigate(-1))
            .catch((error) => console.error("Error updating assurance:", error));
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Modifier Assurance</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Compagnie</label>
                    <input type="text" name="company_name" value={assurance.company_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Numéro Police</label>
                    <input type="text" name="policy_number" value={assurance.policy_number} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Date de Début</label>
                    <input type="date" name="start_date" value={assurance.start_date} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Date de Fin</label>
                    <input type="date" name="end_date" value={assurance.end_date} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Coût (€)</label>
                    <input type="number" name="cost" value={assurance.cost} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Statut</label>
                    <select name="status" value={assurance.status} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="active">Actif</option>
                        <option value="expired">Expiré</option>
                    </select>
                </div>

                <div className="col-span-2 flex justify-end mt-4">
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                        ✅ Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAssurance;