"use client"

import { useEffect, useState, useMemo } from "react"
import { clientAxios } from "../../../api/axios"
import CarFilter from "./CarFilter"
import SearchBar from "./SearchBar"
import NoResults from "./NoResults"
import CarCard from "./CarCard"

const ParcAuto = () => {
  const [cars, setCars] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    type: [],
    passengers: [],
    fuel_type: [],
    transmission: [],
    disponibilite: [],
    priceRange: { min: 0, max: 1000 },
  })

  // Fetch cars on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await clientAxios.get("/cars")
        setCars(response.data.cars)
        console.log("Total cars fetched:", response.data.cars.length)
      } catch (error) {
        console.error("Error fetching cars:", error)
        setError("Une erreur s'est produite lors du chargement des voitures.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Compute filtered cars using useMemo to optimize performance
  const filteredCars = useMemo(() => {
    if (!cars.length) return []

    let result = [...cars]

    // Apply search filter
    if (search.trim()) {
      result = result.filter(
        (car) =>
          (car.marque?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (car.modele?.toLowerCase() || "").includes(search.toLowerCase()),
      )
    }

    // Apply selected filters with corrected logic
    result = result.filter((car) => {
      // Convert prixByDay to number for comparison
      const price = car.prixByDay ? Number.parseFloat(car.prixByDay) : 0

      // Price range check
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false
      }

      // IMPORTANT: 'type' in your data is actually the transmission type
      // So we need to check transmission filter against the 'type' field
      if (filters.transmission.length > 0 && (!car.type || !filters.transmission.includes(car.type))) {
        return false
      }

      // Passengers check - ensure we're comparing numbers
      if (filters.passengers.length > 0) {
        const passengerCount = typeof car.passengers === "string" ? Number.parseInt(car.passengers, 10) : car.passengers

        if (!passengerCount || !filters.passengers.includes(passengerCount)) {
          return false
        }
      }

      // Fuel type check
      if (filters.fuel_type.length > 0 && (!car.fuel_type || !filters.fuel_type.includes(car.fuel_type))) {
        return false
      }

      // Disponibilite check
      if (filters.disponibilite.length > 0) {
        const disponibilite =
          typeof car.Disponibilite === "string" ? Number.parseInt(car.Disponibilite, 10) : car.Disponibilite

        if (disponibilite === undefined || !filters.disponibilite.includes(disponibilite)) {
          return false
        }
      }

      return true
    })

    return result
  }, [search, filters, cars])

  // Handle filter changes from the CarFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notre Parc Automobile</h1>

        {/* Debug info */}
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
          <p>
            Total: {cars.length} | Showing: {filteredCars.length}
          </p>
        </div>

        <div className="lg:flex gap-6">
          {/* Filter Section */}
          <CarFilter onFilterChange={handleFilterChange} />

          <div className="lg:w-3/4">
            {/* Search Bar */}
            <SearchBar search={search} setSearch={setSearch} />

            {/* Error State */}
            {error && <div className="text-red-500 text-center py-4">{error}</div>}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => <CarCard key={car.id} car={car} />)
                ) : (
                  <NoResults />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParcAuto

