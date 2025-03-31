import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaEye, FaEdit, FaCheck, FaTimes, } from "react-icons/fa";
// import '../../styles/ListReservations.css'
import { adminAxios } from "../../api/axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ListReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Filtre de statut
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  // Récupérer les réservations
  const fetchReservations = async () => {
    await adminAxios.get("/reservation")
      .then(response => {
        setReservations(response.data.reservations);
        setFilteredReservations(response.data.reservations);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des réservations", err);
        setLoading(false);
      })
  };

  // Filtrer par statut
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "") {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(reservations.filter(res => res.status === selectedStatus));
    }
  };

  // Changer le statut de la réservation
  const updateStatus = async (id, newStatus) => {
    try {
      await adminAxios.put(`/reservation/${id}/update-status`, { status: newStatus });
      fetchReservations();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  // Mettre à jour le statut de paiement
  const updatePaymentStatus = async (id, payment_status) => {
    console.log(payment_status)
    try {
      await adminAxios.put(`/reservation/${id}/update-payment`, { payment_status });
      fetchReservations();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paiement", error);
    }
  };

  const { token } = useAdminAuth()
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-black border-b-2 border-[#57D500] pb-2 inline-block">Liste des Réservations</h2>
        <Link to="/admin/reservations/create-reservation" className="px-4 py-2 bg-[#57D500] text-white rounded-lg hover:bg-opacity-90 inline-flex items-center">
          <span className="mr-1">+</span> Nouvelle Réservation
        </Link>
      </div>

      {/* Status filter */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-3">
          <label className="font-medium text-gray-700">Filtrer par statut :</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
          >
            <option value="">Tous</option>
            <option value="coming">À venir</option>
            <option value="in progress">En cours</option>
            <option value="completed">Terminée</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#57D500] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Début</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Fin</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant (€)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut reservation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map(res => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{res.client_nom_complete}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(res.date_debut), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(res.date_fin), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.montantTotal}</td>

              
                  {/* Reservation Status with actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${res.status === 'completed' ? 'bg-[#57D500] bg-opacity-10 text-[#ffffff]' :
                          res.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                        {res.status}
                      </span>

                      {res.status !== "completed" && (
                        <div className="ml-1">
                          {res.status === "coming" && (
                            <button
                              onClick={() => updateStatus(res.id, "in progress")}
                              className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                              title="Marquer comme En cours"
                            >
                              <FaCheck className="w-3 h-3" />
                            </button>
                          )}
                          {res.status === "in progress" && (
                            <button
                              onClick={() => updateStatus(res.id, "completed")}
                              className="p-1 bg-[#57D500] text-white rounded-full hover:bg-opacity-90"
                              title="Marquer comme Terminée"
                            >
                              <FaCheck className="w-3 h-3 " />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Payment Status with actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${res.payment_status === 'made' ? 'bg-[#57D500] bg-opacity-10 text-[#ffffff]' :
                          'bg-red-100 text-red-800'}`}>
                        {res.payment_status === "not made" ? "Non payé" : "Payé"}
                      </span>

                      <button
                        onClick={() => updatePaymentStatus(res.id, res.payment_status === "not made" ? "made" : "not made")}
                        className={`p-1 rounded-full ${res.payment_status === "not made"
                            ? "bg-[#57D500] text-white hover:bg-opacity-90"
                            : "bg-red-500 text-white hover:bg-opacity-90"
                          }`}
                        title={res.payment_status === "not made" ? "Marquer comme Payé" : "Marquer comme Non Payé"}
                      >
                        {res.payment_status === "not made"
                          ? <FaCheck className="w-3 h-3" />
                          : <FaTimes className="w-3 h-3" />
                        }
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Link
                        to={`${res.id}`}
                        className="p-1.5 bg-gray-200 text-black rounded-full hover:bg-gray-300"
                        title="Voir détails"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`edit/${res.id}`}
                        className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        title="Modifier"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Responsive hint */}
          <div className="p-2 text-xs text-center text-gray-500 border-t border-gray-200 lg:hidden">
            Faites défiler horizontalement pour voir toutes les données
          </div>
        </div>
      )}
    </div>
  );
};

export default ListReservations;
