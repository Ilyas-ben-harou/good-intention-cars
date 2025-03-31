import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CarDetail.css';
import { clientAxios } from '../../../api/axios';
import { ArrowRight } from 'lucide-react';

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('details'); // État pour suivre l'onglet actif

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await clientAxios(`/car/${id}`);
                const data = await response.data.car;

                // Ensure photos is always an array
                if (data.photos && typeof data.photos === 'string') {
                    try {
                        data.photos = JSON.parse(data.photos);
                    } catch (e) {
                        data.photos = [data.photos];
                    }
                }
                if (!data.photos || !Array.isArray(data.photos)) {
                    data.photos = [];
                }
                setCar(data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handlePrevImage = () => {
        if (!car || !car.photos || car.photos.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? car.photos.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        if (!car || !car.photos || car.photos.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            prevIndex === car.photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (loading) {
        return (
            <div className="car-detail-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="car-detail-container">
                <div className="error-message">
                    <h2>Car not found</h2>
                    <p>The car you are looking for does not exist or has been removed.</p>
                    <button onClick={() => navigate(-1)} className="back-button">Back to cars</button>
                </div>
            </div>
        );
    }

    const photoArray = Array.isArray(car.photos) && car.photos.length > 0
        ? car.photos
        : ['https://via.placeholder.com/800x600?text=No+Image+Available'];

    return (
        <div className="car-detail-container">
            <div className="car-detail-header">
                <button onClick={() => navigate(-1)} className="back-button">← Back to cars</button>
                <h1>{car.marque} {car.modele}</h1>
                <div className="car-badges">
                    <span className={`availability-badge ${car.Disponibilite ? 'disponible' : 'no-disponible'}`}>
                        {car.Disponibilite ? 'Available' : 'Not Available'}
                    </span>
                    <span className="type-badge">{car.type}</span>
                    <span className="fuel-badge">{car.fuel_type}</span>
                </div>
            </div>

            <div className="car-detail-content">
                <div className="car-detail-left">
                    <div className="car-image-gallery">
                        <div className="main-image-container">
                            <img
                                src={`http://localhost:8000/storage/${photoArray[currentImageIndex]}`}
                                alt={`${car.marque} ${car.modele}`}
                                className="main-image"
                            />
                            {photoArray.length > 1 && (
                                <>
                                    <button className="gallery-nav prev" onClick={handlePrevImage}>❮</button>
                                    <button className="gallery-nav next" onClick={handleNextImage}>❯</button>
                                </>
                            )}
                        </div>
                        {photoArray.length > 1 && (
                            <div className="image-thumbnails">
                                {photoArray.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8000/storage/${photo}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="car-tabs">
                        <div className="tab-buttons">
                            <button
                                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                                onClick={() => handleTabClick('details')}
                            >
                                Details
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => handleTabClick('description')}
                            >
                                Description
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'details' && (
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <div className="spec-icon">🚪</div>
                                        <div className="spec-label">Doors</div>
                                        <div className="spec-value">{car.dors}</div>
                                    </div>
                                    <div className="spec-item">
                                        <div className="spec-icon">👥</div>
                                        <div className="spec-label">Passengers</div>
                                        <div className="spec-value">{car.passengers}</div>
                                    </div>
                                    <div className="spec-item">
                                        <div className="spec-icon">⚙️</div>
                                        <div className="spec-label">Engine</div>
                                        <div className="spec-value">{car.engine_capacity}L</div>
                                    </div>
                                    <div className="spec-item">
                                        <div className="spec-icon">🔄</div>
                                        <div className="spec-label">Transmission</div>
                                        <div className="spec-value">{car.type.charAt(0).toUpperCase() + car.type.slice(1)}</div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'description' && (
                                <div className="">
                                    {car.description}
                                    <p>{car.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="car-detail-right">
                    <div className="booking-card">
                        <h2>Booking Details</h2>
                        <div className="price-display">
                            <span className="price">${car.prixByDay}</span>
                            <span className="price-period">par day</span>
                        </div>
                        <div className="booking-divider"></div>
                        {car.Disponibilite ? (
                            <Link
                                to={`/rent-car/${car.id}`}
                                className="px-4 py-2 rounded-lg flex items-center transition-colors duration-300 bg-green-500 hover:bg-green-600 text-white"
                            >
                                Rent Now
                                <ArrowRight className="ml-1" />
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="px-4 py-2 rounded-lg flex items-center bg-gray-200 text-gray-500 cursor-not-allowed"
                            >
                                Rent Now
                                <ArrowRight className="ml-1" />
                            </button>
                        )}
                        {/* <Link
                            to={`/rent-car/${car.id}`}
                            className={`booking-button ${!car.Disponibilite ? 'disabled' : ''}`}
                            disabled={!car.Disponibilite}
                        >
                            {car.Disponibilite ? 'Book Now' : 'Not Available'}
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
