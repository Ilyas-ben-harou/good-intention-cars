import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { adminAxios } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';

const CreateCar = () => {
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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setPhotos(e.target.files);
    };

    const validateImmatriculation = (value) => {
        const regex = /^[0-9]{1,5}-[\u0621-\u064A]-[0-9]{1,2}$/; // Format marocain
        return regex.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateImmatriculation(immatriculation)) {
            setError("L'immatriculation doit être au format marocain (ex: 12345-أ-6).");
            return;
        }

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

        for (let i = 0; i < photos.length; i++) {
            formData.append('photos[]', photos[i]);
        }

        try {
            const response = await adminAxios.post('/car', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Response:', response);
            setSuccess('Car created successfully!');
            setError(null);
            navigate(-1)
        } catch (err) {
            console.error('Error:', err);
            setError('Error creating car. Please try again.');
            setSuccess(null);
        }
    };

    const { token } = useAdminAuth();
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-black">Create New Car</h2>

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
                        className={`w-full border p-2 rounded-md focus:ring-2 ${
                            immatriculation && !validateImmatriculation(immatriculation)
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-[#57D500]'
                        }`}
                        placeholder="12345-أ-6"
                    />
                    {immatriculation && !validateImmatriculation(immatriculation) && (
                        <p className="text-red-500 text-sm mt-1">
                            Format invalide. Exemple : 12345-أ-6
                        </p>
                    )}
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
                    <label className="block font-medium text-gray-700 mb-1">Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#57D500] transition-colors">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            className="w-full cursor-pointer"
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload multiple photos of the car</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#57D500] text-white py-3 rounded-md hover:bg-[#4ab000] transition-colors font-medium shadow-md"
                >
                    Create Car
                </button>
            </form>

            <button
                onClick={() => navigate(-1)}
                className="mt-4 flex items-center justify-center gap-2 text-black hover:text-[#57D500] transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
            </button>
        </div>
    );
};

export default CreateCar;
