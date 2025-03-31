import { ArrowRight, Star } from "lucide-react"
import CarCard from './CarCard'
import { Link } from "react-router-dom"

export default function VoituresPopulaires({cars}) {
  return (
    <section id="cars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="flex justify-center mb-4">
        <div className="px-4 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">OFFRES DE LOCATION POPULAIRES</div>
      </div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Les voitures de location les plus populaires</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to='/parc-auto' className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
          Voir tous les véhicules
          <ArrowRight/>
        </Link>
      </div>
    </section>
  )
}