import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { adminAxios } from "../../api/axios";
import { useAdminAuth } from "../../context/AdminAuthContext";

const UpdateReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAdminAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [reservation, setReservation] = useState();
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        client_nom_complete: "",
        client_phone: "",
        car_id: "",
        pickup_location: "",
        dropoff_location: "",
        date_debut: "",
        date_fin: "",
        montantTotal: 0,
        gps: false,
        baby_seat: false,
        status_client: "pending",
        status: "coming",
        payment_status: "not made"
    });

    // Format date for datetime-local input
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
    
            try {
                const { data } = await adminAxios.get(`/reservation/edit/${id}`);
                setReservation(data.reservation);
    
                const carsResponse = await adminAxios.get("/car");
                setCars(carsResponse.data.cars);
    
                setIsLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [id]);
    
    // Update formData once reservation is loaded
    useEffect(() => {
        if (reservation) {
            setFormData({
                client_nom_complete: reservation.client_nom_complete || "",
                client_phone: reservation.client_phone || "",
                car_id: reservation.car_id?.toString() || "",
                pickup_location: reservation.pickup_location || "",
                dropoff_location: reservation.dropoff_location || "",
                date_debut: reservation.date_debut ? formatDateForInput(reservation.date_debut) : "",
                date_fin: reservation.date_fin ? formatDateForInput(reservation.date_fin) : "",
                montantTotal: reservation.montantTotal || 0,
                gps: reservation.gps || false,
                baby_seat: reservation.baby_seat || false,
                status_client: reservation.status_client || "pending",
                status: reservation.status || "coming",
                payment_status: reservation.payment_status || "not made"
            });
        }
    }, [reservation]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    // Recalculate total amount when dates or car changes
    useEffect(() => {
        if (formData.date_debut && formData.date_fin && formData.car_id) {
            const selectedCar = cars.find(car => car.id === parseInt(formData.car_id));
            if (selectedCar) {
                const startDate = new Date(formData.date_debut);
                const endDate = new Date(formData.date_fin);
                const diffTime = endDate.getTime() - startDate.getTime();
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // Base price
                let total = days * selectedCar.prixByDay;
                
                // Add extras
                if (formData.gps) total += days * 5; // Example: GPS costs 5€ per day
                if (formData.baby_seat) total += days * 7; // Example: Baby seat costs 7€ per day
                
                setFormData((prev) => ({
                    ...prev,
                    montantTotal: total.toFixed(2)
                }));
            }
        }
    }, [formData.date_debut, formData.date_fin, formData.car_id, formData.gps, formData.baby_seat, cars]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminAxios.post(`/reservation/edit/${id}`, formData);
            navigate(-1);
        } catch (error) {
            console.error("Error updating reservation:", error);
            // Add error handling here
        }
    };

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Modifier la réservation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black font-medium">Nom complet du client:</label>
                        <input
                            type="text"
                            name="client_nom_complete"
                            value={formData.client_nom_complete}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium">Téléphone du client:</label>
                        <input
                            type="text"
                            name="client_phone"
                            value={formData.client_phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-black font-medium">Voiture:</label>
                    <select
                        name="car_id"
                        value={formData.car_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                    >
                        <option value="">Sélectionner une voiture</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.marque} {car.modele}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black font-medium">Lieu de prise en charge:</label>
                        <input
                            type="text"
                            name="pickup_location"
                            value={formData.pickup_location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium">Lieu de retour:</label>
                        <input
                            type="text"
                            name="dropoff_location"
                            value={formData.dropoff_location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black font-medium">Date de début:</label>
                        <input
                            type="datetime-local"
                            name="date_debut"
                            value={formData.date_debut}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium">Date de fin:</label>
                        <input
                            type="datetime-local"
                            name="date_fin"
                            value={formData.date_fin}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-black font-medium">Statut de réservation:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        >
                            <option value="coming">À venir</option>
                            <option value="in progress">En cours</option>
                            <option value="completed">Terminée</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-black font-medium">Statut de demande:</label>
                        <select
                            name="status_client"
                            value={formData.status_client}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        >
                            <option value="pending">En attente</option>
                            <option value="approved">Approuvée</option>
                            <option value="rejected">Rejetée</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-black font-medium">Statut de paiement:</label>
                        <select
                            name="payment_status"
                            value={formData.payment_status}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500]"
                        >
                            <option value="not made">Non effectué</option>
                            <option value="made">Effectué</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-black font-medium">Montant Total (€):</label>
                        <input
                            type="text"
                            value={formData.montantTotal}
                            readOnly
                            className="w-full p-2 border bg-gray-100 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="gps"
                            name="gps"
                            checked={formData.gps}
                            onChange={handleChange}
                            className="h-5 w-5 text-[#57D500] rounded focus:ring-[#57D500]"
                        />
                        <label htmlFor="gps" className="text-black font-medium">GPS</label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="baby_seat"
                            name="baby_seat"
                            checked={formData.baby_seat}
                            onChange={handleChange}
                            className="h-5 w-5 text-[#57D500] rounded focus:ring-[#57D500]"
                        />
                        <label htmlFor="baby_seat" className="text-black font-medium">Siège bébé</label>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#57D500] text-white px-4 py-2 rounded-lg shadow hover:bg-[#4cb400] transition"
                    >
                        <FaSave /> Enregistrer
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
                        onClick={() => navigate("/admin/reservations")}
                    >
                        <FaArrowLeft /> Retour
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReservation;