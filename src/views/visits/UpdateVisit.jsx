import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAxios } from '../../api/axios';
import { FaSave, FaTimes, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

const UpdateVisit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [formData, setFormData] = useState({
        car_id: '',
        visit_date: new Date(),
        expiration_date: new Date(),
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchVisit();
        fetchCars();
    }, [id]);

    const fetchVisit = async () => {
        try {
            setLoading(true);
            const response = await adminAxios.get(`/technical-visits/${id}`);

            // Parse the dates from string to Date objects
            const visitData = response.data.visit;
            setFormData({
                car_id: visitData.car_id.toString(),
                visit_date: new Date(visitData.visit_date),
                expiration_date: new Date(visitData.expiration_date),
            });
        } catch (err) {
            console.error('Error fetching technical visit:', err);

            if (err.response && err.response.status === 404) {
                setNotFound(true);
            } else {
                setError('Failed to load technical visit. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCars = async () => {
        try {
            const response = await adminAxios.get('/car');
            setCars(response.data.cars);
        } catch (err) {
            console.error('Error fetching cars:', err);
            // We still have the main error message, so no need to set another error here
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for this field when user changes it
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null,
            });
        }
    };

    const handleDateChange = (date, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: date,
        });

        // Clear error for this field when user changes it
        if (formErrors[fieldName]) {
            setFormErrors({
                ...formErrors,
                [fieldName]: null,
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.car_id) {
            errors.car_id = 'Veuillez sélectionner un véhicule';
        }

        if (!formData.visit_date) {
            errors.visit_date = 'Veuillez sélectionner une date de visite';
        }

        if (!formData.expiration_date) {
            errors.expiration_date = 'Veuillez sélectionner une date d\'expiration';
        } else if (formData.expiration_date <= formData.visit_date) {
            errors.expiration_date = 'La date d\'expiration doit être ultérieure à la date de visite';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);

            // Format dates for API
            const formattedData = {
                ...formData,
                visit_date: formData.visit_date.toISOString().split('T')[0],
                expiration_date: formData.expiration_date.toISOString().split('T')[0],
            };

            await adminAxios.put(`/technical-visits/${id}`, formattedData);
            navigate(-1);
        } catch (err) {
            console.error('Error updating technical visit:', err);

            if (err.response && err.response.data && err.response.data.errors) {
                setFormErrors(err.response.data.errors);
            } else {
                setError('Failed to update technical visit. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-blue-600 text-2xl" />
                <span className="ml-2">Chargement des données...</span>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="container mx-auto p-4">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">Visite Technique non trouvée</h1>
                    <p className="mb-4">La visite technique que vous recherchez n'existe pas ou a été supprimée.</p>
                    <button
                        onClick={() => navigate('/admin/technical-visits')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-6">Modifier Visite Technique</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="car_id">
                            Véhicule
                        </label>
                        <select
                            id="car_id"
                            name="car_id"
                            value={formData.car_id}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${formErrors.car_id ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Sélectionnez un véhicule</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id.toString()}>
                                    {car.marque} {car.modele} - {car.immatriculation}
                                </option>
                            ))}
                        </select>
                        {formErrors.car_id && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.car_id}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visit_date">
                                Date de visite
                            </label>
                            <div className="relative">
                                <DatePicker
                                    id="visit_date"
                                    selected={formData.visit_date}
                                    onChange={(date) => handleDateChange(date, 'visit_date')}
                                    dateFormat="dd/MM/yyyy"
                                    locale="fr"
                                    className={`w-full px-3 py-2 border rounded-md ${formErrors.visit_date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            {formErrors.visit_date && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.visit_date}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration_date">
                                Date d'expiration
                            </label>
                            <div className="relative">
                                <DatePicker
                                    id="expiration_date"
                                    selected={formData.expiration_date}
                                    onChange={(date) => handleDateChange(date, 'expiration_date')}
                                    dateFormat="dd/MM/yyyy"
                                    locale="fr"
                                    className={`w-full px-3 py-2 border rounded-md ${formErrors.expiration_date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            {formErrors.expiration_date && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.expiration_date}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/technical-visits')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <FaTimes className="mr-2" />
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            {submitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <FaSave className="mr-2" />
                                    Enregistrer
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVisit;