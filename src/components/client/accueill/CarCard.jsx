"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function CarteVoiture({ car }) {
  const [imageError, setImageError] = useState(false)

  // Analyser les photos si c'est une chaîne
  const photos = typeof car.photos === "string" ? JSON.parse(car.photos) : car.photos

  // Gérer l'erreur de chargement de l'image
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      <Link to={`/car/${car.id}`} className="relative aspect-[16/9] overflow-hidden">
        {!imageError && photos && photos.length > 0 ? (
          <img
            src={`http://localhost:8000/storage/${photos[0]}`}
            alt={`${car.marque} ${car.modele}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        )}

        {/* Badge de disponibilité */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${car.Disponibilite ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {car.Disponibilite ? "Disponible" : "Indisponible"}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        {/* Titre de la voiture */}
        <Link to={`/car/${car.id}`} className="mb-3 hover:text-green-600 transition-colors">
          <h3 className="font-bold text-xl text-gray-800">
            {car.marque} {car.modele}
          </h3>
          <p className="text-sm text-gray-500">{car.annee}</p>
        </Link>

        {/* Caractéristiques de la voiture */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{car.passengers} Passagers</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 16.5H17M12 7V9M6 12H18M7 19.4V20.8C7 21.9201 7 22.4802 7.21799 22.908C7.40973 23.2843 7.71569 23.5903 8.09202 23.782C8.51984 24 9.0799 24 10.2 24H13.8C14.9201 24 15.4802 24 15.908 23.782C16.2843 23.5903 16.5903 23.2843 16.782 22.908C17 22.4802 17 21.9201 17 20.8V19.4C17 18.2799 17 17.7198 16.782 17.292C16.5903 16.9157 16.2843 16.6097 15.908 16.418C15.4802 16.2 14.9201 16.2 13.8 16.2H10.2C9.0799 16.2 8.51984 16.2 8.09202 16.418C7.71569 16.6097 7.40973 16.9157 7.21799 17.292C7 17.7198 7 18.2799 7 19.4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 13.5L6.5 7.5C6.62959 7.18562 6.8734 6.93431 7.17973 6.7839C7.48606 6.63348 7.83562 6.59344 8.17 6.67L12.012 7.5C12.3941 7.58101 12.7357 7.79634 12.9777 8.11114C13.2197 8.42593 13.3459 8.82218 13.333 9.226L13 13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="capitalize">{car.type === "automatic" ? "Automatique" : "Manuelle"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 12C14 14.2091 12.2091 16 10 16C7.79086 16 6 14.2091 6 12C6 9.79086 7.79086 8 10 8C12.2091 8 14 9.79086 14 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 2V4M10 20V22M2 12H4M16 12H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M4.93 19.07L6.34 17.66M13.66 10.34L15.07 8.93"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{car.engine_capacity} L</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 21H21M6 18V9.99998M10 18V9.99998M14 18V9.99998M18 18V9.99998M20 7L12.424 2.26499C12.2702 2.16236 12.1933 2.11104 12.1108 2.08519C12.0379 2.06246 11.9621 2.06246 11.8892 2.08519C11.8067 2.11104 11.7298 2.16236 11.576 2.26499L4 7H20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{car.dors} Portes</span>
          </div>
        </div>

        {/* Badge du type de carburant */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.fuel_type === "essence" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {car.fuel_type === "essence" ? "Essence" : "Diesel"}
          </span>
        </div>

        {/* Prix et bouton */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div>
            <div className="text-sm text-gray-500">Prix</div>
            <div className="font-bold text-xl">{car.prixByDay} DH</div>
            <div className="text-xs text-gray-500">/jour</div>
          </div>

          {car.Disponibilite ? (
            <Link
              to={`/rent-car/${car.id}`}
              className="px-4 py-2 rounded-lg flex items-center transition-colors duration-300 bg-green-500 hover:bg-green-600 text-white"
            >
              Louer Maintenant
              <ArrowRight className="ml-1" />
            </Link>
          ) : (
            <button
              disabled
              className="px-4 py-2 rounded-lg flex items-center bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Louer Maintenant
              <ArrowRight className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}