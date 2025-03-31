import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAxios } from "../../api/axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const ListAssurance = () => {
    const [assurances, setAssurances] = useState([]);
    const [filteredAssurances, setFilteredAssurances] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchAssurances();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this assurance?")) {
            adminAxios.delete(`/assurance/${id}`)
                .then((response) => {
                    alert(response.data.message);
                    // You can refresh the list of assurances or update your state here
                    // Example: refetching the list after successful deletion
                    fetchAssurances(); // Assuming you have a method to fetch the assurances
                })
                .catch((error) => {
                    alert("Error deleting the assurance. Please try again.");
                    console.error("Error deleting assurance:", error);
                });
        }
    };

    const fetchAssurances = async () => {
        try {
            const response = await adminAxios.get("/assurance");
            setAssurances(response.data.assurances);
            setFilteredAssurances(response.data.assurances);
        } catch (error) {
            console.error("Error fetching assurances:", error);
        }
    };

    // Handle filtering
    useEffect(() => {
        let filtered = assurances;

        if (search) {
            filtered = filtered.filter((assurance) =>
                assurance.company_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter((assurance) => assurance.status === statusFilter);
        }

        setFilteredAssurances(filtered);
    }, [search, statusFilter, assurances]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700">Liste des Assurances</h2>
                <Link to="/admin/assurances/create" className="bg-[#57D500] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    ➕ Nouvelle Assurance
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par compagnie..."
                    className="border p-2 rounded w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-1/3"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Tous</option>
                    <option value="active">Actif</option>
                    <option value="expired">Expiré</option>
                </select>
            </div>

            {/* Assurance Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-3">Compagnie</th>
                            <th className="border p-3">Numéro Police</th>
                            <th className="border p-3">Début</th>
                            <th className="border p-3">Fin</th>
                            <th className="border p-3">Coût</th>
                            <th className="border p-3">Statut</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssurances.length > 0 ? (
                            filteredAssurances.map((assurance) => (
                                <tr key={assurance.id} className="text-center">
                                    <td className="border p-3">{assurance.company_name}</td>
                                    <td className="border p-3">{assurance.policy_number}</td>
                                    <td className="border p-3">{new Date(assurance.start_date).toLocaleDateString('en-CA')}</td>
                                    <td className="border p-3">{new Date(assurance.end_date).toLocaleDateString('en-CA')}</td>
                                    <td className="border p-3">{assurance.cost} €</td>
                                    <td className={`border p-3 font-semibold ${assurance.status === "active" ? "text-green-600" : "text-red-600"}`}>
                                        {assurance.status === "active" ? "Actif" : "Expiré"}
                                    </td>
                                    <td className="border p-3 flex justify-center gap-3">
                                        <Link to={`/admin/assurances/${assurance.id}`} className="text-blue-500 hover:text-blue-700">
                                            <FaEye size={18} />
                                        </Link>
                                        <Link to={`/admin/assurances/edit/${assurance.id}`} className="text-yellow-500 hover:text-yellow-700">
                                            <FaEdit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(assurance.id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border p-3 text-center text-gray-500">
                                    Aucune assurance trouvée.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAssurance;
