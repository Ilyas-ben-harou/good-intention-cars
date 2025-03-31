import React, { useState, useEffect } from "react";
// import '../../styles/CreateReservation.css'
import { adminAxios } from "../../api/axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Baby, Navigation } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";

const CreateReservation = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        car_id: "",
        pickup_location: "",
        dropoff_location: "",
        date_debut: "",
        date_fin: "",
        gps: false,
        baby_seat: false,
        montantTotal: 0,
        status_client: "pending",
        status: "coming",
        payment_status: "not made",
    });

    // Fetch clients and cars when component loads
    useEffect(() => {
        adminAxios.get("/car").then((res) => setCars(res.data.cars));
    }, []);

    // Calculate total price when dates or car change
    useEffect(() => {
        if (formData.car_id && formData.date_debut && formData.date_fin) {
            const selectedCar = cars.find((car) => car.id === parseInt(formData.car_id));
            if (selectedCar) {
                const startDate = new Date(formData.date_debut);
                const endDate = new Date(formData.date_fin);
                const days = (endDate - startDate) / (1000 * 60 * 60 * 24); // Convert ms to days
                if (days > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        montantTotal: (days * selectedCar.prixByDay).toFixed(2), // Calculate total price
                    }));
                }
            }
        }
    }, [formData.car_id, formData.date_debut, formData.date_fin, cars]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            await adminAxios.post("/reservation", formData);
            alert("Réservation créée avec succès !");
            setFormData({
                client_nom_complete: "",
                client_phone: "",
                client_id: "",
                car_id: "",
                pickup_location: "",
                dropoff_location: "",
                date_debut: "",
                date_fin: "",
                gps: false,
                baby_seat: false,
                montantTotal: 0,
                status_client: "pending",
                status: "coming",
                payment_status: "not made",
            });
            navigate(-1)
        } catch (error) {
            console.error("Erreur lors de la création", error);
        }
    };
    const { token } = useAdminAuth()
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-black border-b-2 border-[#57D500] pb-2 inline-block">Créer une Réservation</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Client Information */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Informations Client</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="client_nom_complete" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom Client:
                                </label>
                                <input
                                    type="text"
                                    id="client_nom_complete"
                                    name="client_nom_complete"
                                    value={formData.client_nom_complete}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="client_phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone Client:
                                </label>
                                <input
                                    type="text"
                                    id="client_phone"
                                    name="client_phone"
                                    value={formData.client_phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="pickup_location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Pick-up location:
                                </label>
                                <input
                                    type="text"
                                    id="pickup_location"
                                    name="pickup_location"
                                    value={formData.pickup_location}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="dropoff_location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Drop-off location:
                                </label>
                                <input
                                    type="text"
                                    id="dropoff_location"
                                    name="dropoff_location"
                                    value={formData.dropoff_location}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/*section extras optionel */}
                    <div className="mb-6 space-y-3">
                        <h3 className="font-medium text-gray-700">Optional Extras</h3>

                        <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center">
                                <Navigation className="h-5 w-5 mr-2 text-green-600" />
                                <span>GPS Navigation</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 mr-2">25 DH</span>
                                <Checkbox
                                    id="gps"
                                    name="gps"
                                    checked={formData.gps}
                                    onCheckedChange={(checked) => setFormData({ ...formData, gps: checked === true })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center">
                                <Baby className="h-5 w-5 mr-2 text-green-600" />
                                <span>Baby Seat</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 mr-2">25 DH</span>
                                <Checkbox
                                    id="baby_seat"
                                    name="baby_seat"
                                    checked={formData.baby_seat}
                                    onCheckedChange={(checked) => setFormData({ ...formData, baby_seat: checked === true })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Car Selection */}
                    <div className="md:col-span-2">
                        <label htmlFor="car_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Voiture:
                        </label>
                        <select
                            id="car_id"
                            name="car_id"
                            value={formData.car_id}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent bg-white"
                            required
                        >
                            <option value="">Sélectionner une voiture</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.marque} {car.modele} - {car.prixByDay} €/jour
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reservation Dates */}
                    <div>
                        <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700 mb-1">
                            Date de début:
                        </label>
                        <input
                            type="date"
                            id="date_debut"
                            name="date_debut"
                            value={formData.date_debut}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700 mb-1">
                            Date de fin:
                        </label>
                        <input
                            type="date"
                            id="date_fin"
                            name="date_fin"
                            value={formData.date_fin}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Total Amount */}
                    <div className="md:col-span-2">
                        <label htmlFor="montantTotal" className="block text-sm font-medium text-gray-700 mb-1">
                            Montant Total (€):
                        </label>
                        <input
                            type="text"
                            id="montantTotal"
                            name="montantTotal"
                            value={formData.montantTotal}
                            readOnly
                            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none"
                        />
                    </div>

                    {/* Status Information */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">Statuts</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="status_client" className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut client:
                                </label>
                                <select
                                    id="status_client"
                                    name="status_client"
                                    value={formData.status_client}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent bg-white"
                                    required
                                >
                                    <option value="pending">En attente</option>
                                    <option value="approved">Approuvé(e)</option>
                                    <option value="rejected">Rejeté(e)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut réservation:
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent bg-white"
                                    required
                                >
                                    <option value="coming">À venir</option>
                                    <option value="in progress">En cours</option>
                                    <option value="completed">Terminée</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut de paiement:
                                </label>
                                <select
                                    id="payment_status"
                                    name="payment_status"
                                    value={formData.payment_status}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent bg-white"
                                    required
                                >
                                    <option value="not made">Non payé</option>
                                    <option value="made">Payé</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between pt-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#57D500] text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Créer la Réservation
                    </button>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
                        <FaArrowLeft className="w-4 h-4" /> Retour
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReservation;
