import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
// import '../../styles/ListCars.css';
import { adminAxios } from '../../api/axios';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredcars, setFilteredcars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTerm, setStatusTerm] = useState('');
  const [error, setError] = useState(null);

  const getInsuranceWarning = (car) => {
    if (!car.assurances || car.assurances.length === 0) return null;

    const activeInsurance = car.assurances.find(a => a.status === "active");

    if (!activeInsurance) return null;

    const endDate = new Date(activeInsurance.end_date);
    const today = new Date();
    const differenceInDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 5) {
      return (
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Assurance exp. dans {differenceInDays} j
          </span>
        </div>
      );
    }

    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminAxios.get('/car');
        setCars(response.data.cars);
        setFilteredcars(response.data.cars);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Failed to load cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '' || statusTerm.trim() !== '') {
      const filtered = cars.filter(car =>
        (searchTerm.trim() !== '' && (
          car.marque?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.modele?.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (statusTerm.trim() !== '' && car.Disponibilite === Number(statusTerm))
      );
      setFilteredcars(filtered);
    } else {
      setFilteredcars(cars);
    }
  }, [searchTerm, statusTerm, cars]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await adminAxios.delete(`/car/${id}`);
      setCars(cars.filter(car => car.id !== id));
      setFilteredcars(filteredcars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car', error);
      alert('Failed to delete car.');
    }
  };

  const { token } = useAdminAuth()
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="w-full bg-black/5 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">Cars List</h2>
      <div className="flex flex-col  ">
        <div className="search-container w-full md:flex-2/3 flex items-center justify-between">
          <span>Filtrer par marque ou modele:</span>
          <input
            type="text"
            placeholder="Search by marque or modele..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
          />
          <button className="bg-red-600 text-white p-2 rounded mx-2" onClick={() => setSearchTerm('')}>reset</button>
        </div>
        <div className="search-container w-full md:flex-2/3 flex items-center justify-between">
          <span className=''>Filtrer par disponibilite:</span>
          <select
            type="text"
            placeholder="Search by name or email..."
            value={statusTerm}
            onChange={(e) => setStatusTerm(e.target.value)}
            className="flex-auto p-3 m-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57D500] focus:border-transparent"
          >
            <option value="">select status</option>
            <option value='1'>Disponible</option>
            <option value='0'>Indisponible</option>
          </select>
          <button className="bg-red-600 text-white p-2 rounded mx-2" onClick={() => setStatusTerm('')}>
            reset
          </button>

        </div>
        <div className="w-full md:w-auto mb-3 flex justify-center items-center gap-2 bg-[#57D500] text-white px-4 py-3 hover:bg-[#4ab000] transition-colors duration-200 rounded-lg shadow-md">
          <FaPlus />
          <Link className="font-medium" to="/admin/cars/create-car">Ajouter Car</Link>
        </div>
      </div>
      {filteredcars.length === 0 ? (
        <p className="no-results bg-gray-100 text-gray-600 p-6 text-center rounded-lg">No cars found matching your search criteria.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="cars-table w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#57D500] text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Marque</th>
                <th className="px-4 py-3 text-left">Modele</th>
                <th className="px-4 py-3 text-left">Prix/Jour</th>
                <th className="px-4 py-3 text-left">Disponibilité</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredcars.map((car, index) => (
                <tr key={car.id || index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">{car.id || index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`http://localhost:8000/storage/${Array.isArray(car.photos) ? car.photos[0] : JSON.parse(car.photos)[0]}`}
                      alt="Car"
                      className="w-40 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{car.marque || 'N/A'}</td>
                  <td className="px-4 py-3">{car.modele || 'N/A'}</td>
                  <td className="px-4 py-3 font-medium">{car.prixByDay || 'N/A'} €</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${car.Disponibilite
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}>
                        <span className={`w-2 h-2 mr-1.5 rounded-full ${car.Disponibilite ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        {car.Disponibilite ? "Disponible" : "Indisponible"}
                      </span>
                      {getInsuranceWarning(car)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <Link to={`/admin/cars/${car.id}`} className="text-[#57D500] hover:text-[#4ab000] transition-colors">
                        <FaEye className="text-lg" />
                      </Link>
                      <Link to={`/admin/cars/edit/${car.id}`} className="text-[#57D500] hover:text-[#4ab000] transition-colors">
                        <FaEdit className="text-lg" />
                      </Link>
                      <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:text-red-700 transition-colors">
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default ListCars;
