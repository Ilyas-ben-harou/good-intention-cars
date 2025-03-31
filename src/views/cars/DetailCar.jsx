"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Navigate, Link } from "react-router-dom"
import { FaArrowLeft, FaArrowRight, FaEdit, FaCarAlt } from "react-icons/fa"
import { adminAxios } from "../../api/axios"
import { useAdminAuth } from "../../context/AdminAuthContext"

const DetailCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [assurance, setAssurance] = useState(null)
    const [technicalVisit, setTechnicalVisit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { token } = useAdminAuth()

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setLoading(true);
                const response = await adminAxios.get(`/car/${id}`);
                setCar(response.data.car);
                setAssurance(response.data.assurance);
                setTechnicalVisit(response.data.visit);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError("Failed to load car details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails()
    }, [id])

    // Auth check should be before any return statements that use car data
    if (!token) {
        return <Navigate to="/admin/login" />
    }

    if (loading) {
        return <div className="loading-container">Loading car details...</div>
    }

    if (error) {
        return <div className="error-container">{error}</div>
    }

    if (!car) {
        return <div className="error-container">Car not found</div>
    }

    // Parse images only after car is confirmed to exist
    const images = car.photos ? JSON.parse(car.photos) : []

    // Check if there's a valid technical visit
    const hasValidVisit = technicalVisit && new Date(technicalVisit.expiration_date) >= new Date();

    const nextImage = () => {
        if (images.length > 0 && currentImageIndex < images.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        }
    };
    
    const prevImage = () => {
        if (images.length > 0 && currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
        }
    };

    // Format date function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-CA');
    };

    return (
        <div className="car-detail-container max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
            <h2 className="text-2xl font-bold p-6 border-b text-black">Car Details</h2>

            {/* Image gallery */}
            <div className="image-container relative bg-gray-100 aspect-video">
                {images.length > 0 ? (
                    <>
                        <img
                            src={`http://localhost:8000/storage/${images[currentImageIndex]}`}
                            alt={`${car.marque} ${car.modele}`}
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    className={`prev-btn absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                                    onClick={prevImage}
                                    disabled={currentImageIndex === 0}
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    className={`next-btn absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentImageIndex === images.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                                    onClick={nextImage}
                                    disabled={currentImageIndex === images.length - 1}
                                >
                                    <FaArrowRight />
                                </button>
                                <div className="image-counter absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {images.length}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full p-8 text-gray-500">
                        No images available
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Car details */}
                <div className="car-detail-card grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">ID:</span>
                        <span>{car.id}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Marque:</span>
                        <span className="font-semibold">{car.marque}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Modèle:</span>
                        <span className="font-semibold">{car.modele}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Prix/Jour:</span>
                        <span className="font-semibold text-[#57D500]">{car.prixByDay} €</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Portes:</span>
                        <span>{car.dors}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Carburant:</span>
                        <span>{car.fuel_type}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Transmission:</span>
                        <span>{car.type}</span>
                    </div>
                    <div className="car-detail-item flex">
                        <span className="font-medium w-36 text-gray-700">Passagers:</span>
                        <span>{car.passengers}</span>
                    </div>
                </div>

                {/* Current Assurance */}
                <div className="current-assurance mb-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Assurance Actuelle</h3>
                    {assurance ? (
                        <div className="assurance-detail bg-yellow-100 p-4 rounded-lg shadow-md">
                            <p><strong>Compagnie:</strong> {assurance.company_name}</p>
                            <p><strong>Numéro de police:</strong> {assurance.policy_number}</p>
                            <p><strong>Date début:</strong> {formatDate(assurance.start_date)}</p>
                            <p><strong>Date fin:</strong> {formatDate(assurance.end_date)}</p>
                            <p><strong>Coût:</strong> {assurance.cost} €</p>
                            <p><strong>Statut:</strong> {assurance.status}</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-700">
                            Aucune assurance active pour cette voiture.
                        </div>
                    )}
                </div>

                {/* Current Technical Visit */}
                <div className="current-visit mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">Visite Technique Actuelle</h3>
                        {technicalVisit && (
                            <div className={`status-badge px-3 py-1 rounded-full text-white text-sm ${hasValidVisit ? 'bg-green-500' : 'bg-red-500'}`}>
                                {hasValidVisit ? 'Valide' : 'Expirée'}
                            </div>
                        )}
                    </div>
                    
                    {technicalVisit ? (
                        <div className="visit-detail bg-blue-50 p-4 rounded-lg shadow-md">
                            <p><strong>Date de visite:</strong> {formatDate(technicalVisit.visit_date)}</p>
                            <p><strong>Date d'expiration:</strong> {formatDate(technicalVisit.expiration_date)}</p>
                            <p><strong>Dernière mise à jour:</strong> {formatDate(technicalVisit.updated_at)}</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-blue-700">
                            Aucune visite technique enregistrée pour cette voiture.
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-100 transition"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back</span>
                    </button>
                    <Link
                        to={`/admin/cars/edit/${car.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#57D500] text-white rounded-lg shadow hover:bg-[#4ab000] transition"
                    >
                        <FaEdit className="text-sm" />
                        <span>Edit Car</span>
                    </Link>
                    <Link
                        to={`/admin/technical-visits/create/${car.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        <FaCarAlt className="text-sm" />
                        <span>Add Visit</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DetailCar