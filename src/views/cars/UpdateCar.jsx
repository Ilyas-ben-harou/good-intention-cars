import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminAxios } from '../../api/axios';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';

const UpdateCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAdminAuth();

    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [immatriculation, setImmatriculation] = useState('');
    const [dors, setDors] = useState('');
    const [engine_capacity, setEngine_capacity] = useState('');
    const [fuel_type, setFuel_type] = useState('');
    const [type, setType] = useState('');
    const [passengers, setPassengers] = useState('');
    const [prixByDay, setPrixByDay] = useState('');
    const [Disponibilite, setDisponibilite] = useState(true);
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const [removedPhotoIndexes, setRemovedPhotoIndexes] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setLoading(true);
                const response = await adminAxios.get(`/car/${id}`);
                const carData = response.data.car;

                setMarque(carData.marque);
                setModele(carData.modele);
                setImmatriculation(carData.immatriculation);
                setDors(carData.dors);
                setEngine_capacity(carData.engine_capacity);
                setFuel_type(carData.fuel_type);
                setType(carData.type);
                setPassengers(carData.passengers);
                setPrixByDay(carData.prixByDay);
                setDisponibilite(carData.Disponibilite);
                setDescription(carData.description);
                setPhotos(Array.isArray(carData.photos) ? carData.photos : JSON.parse(carData.photos));
            } catch (err) {
                console.error('Error fetching car details:', err);
                setError('Failed to load car details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleFileChange = (e) => {
        setNewPhotos(e.target.files);
    };

    const handleDeletePhoto = (index) => {
        setRemovedPhotoIndexes([...removedPhotoIndexes, index]);
    };

    const handleDelete = async (carId) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await adminAxios.delete(`/car/${carId}`);
                setSuccess('Car deleted successfully!');
                setTimeout(() => navigate('/admin/cars'), 1500);
            } catch (err) {
                console.error('Error deleting car:', err);
                setError('Failed to delete car. Please try again.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('marque', marque);
        formData.append('modele', modele);
        formData.append('immatriculation', immatriculation);
        formData.append('dors', dors);
        formData.append('engine_capacity', engine_capacity);
        formData.append('fuel_type', fuel_type);
        formData.append('type', type);
        formData.append('passengers', passengers);
        formData.append('prixByDay', prixByDay);
        formData.append('Disponibilite', Disponibilite ? 1 : 0);
        formData.append('description', description);

        if (removedPhotoIndexes.length > 0) {
            formData.append('removed_photos', JSON.stringify(removedPhotoIndexes));
        }

        for (let i = 0; i < newPhotos.length; i++) {
            formData.append('photos[]', newPhotos[i]);
        }

        formData.append('_method', 'POST');

        try {
            const response = await adminAxios.post(`/car/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Car updated successfully!');
            setTimeout(() => navigate(-1), 1000);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Error updating car. Please try again.');
            setSuccess(null);
        }
    };

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    if (loading) {
        return <div className="max-w-lg mx-auto mt-10 text-center">Loading car details...</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-black">Update Car</h2>

            {error && <p className="text-red-500 p-3 bg-red-50 rounded-md mb-4">{error}</p>}
            {success && <p className="text-[#57D500] p-3 bg-[#57D500]/10 rounded-md mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Immatriculation</label>
                    <input
                        type="text"
                        value={immatriculation}
                        onChange={(e) => setImmatriculation(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Marque</label>
                    <input
                        type="text"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Modele</label>
                    <input
                        type="text"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Doors</label>
                    <input
                        type="number"
                        value={dors}
                        onChange={(e) => setDors(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Engine Capacity</label>
                    <input
                        type="number"
                        value={engine_capacity}
                        onChange={(e) => setEngine_capacity(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select
                        value={fuel_type}
                        onChange={(e) => setFuel_type(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent appearance-none bg-white"
                    >
                        <option value="">Choose type of your fuel</option>
                        <option value="essence">Essence</option>
                        <option value="diesel">Diesel</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent appearance-none bg-white"
                    >
                        <option value="">Choose type car</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Passengers</label>
                    <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Prix By Day</label>
                    <input
                        type="number"
                        value={prixByDay}
                        onChange={(e) => setPrixByDay(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <label className="font-medium text-gray-700">Disponibilite</label>
                    <div className="relative inline-block w-10 h-5 rounded-full cursor-pointer">
                        <input
                            type="checkbox"
                            checked={Disponibilite}
                            onChange={(e) => setDisponibilite(e.target.checked)}
                            className="sr-only"
                            id="toggle"
                        />
                        <label
                            htmlFor="toggle"
                            className={`block h-5 rounded-full ${Disponibilite ? 'bg-[#57D500]' : 'bg-gray-300'} transition-colors duration-200`}
                        >
                            <span
                                className={`block w-5 h-5 mt-0 rounded-full shadow transform transition-transform duration-200 ${Disponibilite ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}`}
                            ></span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#57D500] focus:border-transparent min-h-32"
                    ></textarea>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Current Photos</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {photos && photos.map((photo, index) => (
                            removedPhotoIndexes.includes(index) ? null : (
                                <div key={index} className="relative group">
                                    <img
                                        src={`http://localhost:8000/storage/${photo}`}
                                        alt={`Car photo ${index + 1}`}
                                        className="w-full h-20 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDeletePhoto(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Upload New Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#57D500] transition-colors">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            className="w-full cursor-pointer"
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload additional photos or replacements</p>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="w-2/3 bg-[#57D500] text-white py-3 rounded-md hover:bg-[#4ab000] transition-colors font-medium shadow-md flex items-center justify-center gap-2"
                    >
                        <FaEdit className="h-4 w-4" />
                        <span>Update Car</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="w-1/3 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </form>

            <button
                onClick={() => navigate(-1)}
                className="mt-4 flex items-center justify-center gap-2 text-black hover:text-[#57D500] transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
            </button>
        </div>
    );
};

export default UpdateCar;
