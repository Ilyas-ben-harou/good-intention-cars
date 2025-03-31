import { useState, useEffect } from "react"

const CarFilter = ({ onFilterChange }) => {
    // Increased max price to 1000 to include more cars
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
    const [filters, setFilters] = useState({
        type: [],
        passengers: [],
        fuel_type: [],
        transmission: [],
        disponibilite: [],
    })

    // Initialize filters with proper values
    useEffect(() => {
        // Send initial filter state to parent
        onFilterChange({ ...filters, priceRange })
    }, []);

    const handleCheckboxChange = (category, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters }
            updatedFilters[category] = updatedFilters[category].includes(value)
                ? updatedFilters[category].filter((item) => item !== value)
                : [...updatedFilters[category], value]

            onFilterChange({ ...updatedFilters, priceRange })
            return updatedFilters
        })
    }

    const handlePriceChange = (type, value) => {
        const numValue = Math.max(0, Number(value) || 0) // Évite les valeurs négatives

        setPriceRange((prevPriceRange) => {
            const updatedPriceRange = {
                ...prevPriceRange,
                [type]: numValue,
            }

            if (updatedPriceRange.min > updatedPriceRange.max) {
                updatedPriceRange.max = updatedPriceRange.min
            }

            onFilterChange({ ...filters, priceRange: updatedPriceRange })
            return updatedPriceRange
        })
    }

    // Add a reset function
    const resetFilters = () => {
        const resetState = {
            type: [],
            passengers: [],
            fuel_type: [],
            transmission: [],
            disponibilite: [],
        };
        setFilters(resetState);
        setPriceRange({ min: 0, max: 1000 });
        onFilterChange({ ...resetState, priceRange: { min: 0, max: 1000 } });
    }

    return (
        <div className="lg:w-1/4 mb-6 lg:mb-0 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="w-full mb-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
                Réinitialiser les filtres
            </button>

            {/* Disponibilité Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="uppercase text-xs text-gray-500 mb-4 font-medium">Disponibilité</h2>
                <div className="space-y-2">
                    {[1, 0].map((value) => (
                        <label key={value} className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-green-500"
                                checked={filters.disponibilite.includes(value)}
                                onChange={() => handleCheckboxChange("disponibilite", value)}
                            />
                            <span className="ml-2 text-sm">{value === 1 ? "Disponible" : "Non disponible"}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Passengers Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="uppercase text-xs text-gray-500 mb-4 font-medium">Capacité</h2>
                <div className="space-y-2">
                    {[2, 4, 5, 7].map((num) => (
                        <label key={num} className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-green-500"
                                checked={filters.passengers.includes(num)}
                                onChange={() => handleCheckboxChange("passengers", num)}
                            />
                            <span className="ml-2 text-sm">{num === 7 ? "7+ Personnes" : `${num} Personnes`}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Fuel Type Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="uppercase text-xs text-gray-500 mb-4 font-medium">Type de Carburant</h2>
                <div className="space-y-2">
                    {["essence", "diesel"].map((fuel) => (
                        <label key={fuel} className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-green-500"
                                checked={filters.fuel_type.includes(fuel)}
                                onChange={() => handleCheckboxChange("fuel_type", fuel)}
                            />
                            <span className="ml-2 text-sm">{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission Type Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="uppercase text-xs text-gray-500 mb-4 font-medium">Transmission</h2>
                <div className="space-y-2">
                    {["automatic", "manual"].map((trans) => (
                        <label key={trans} className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-green-500"
                                checked={filters.transmission.includes(trans)}
                                onChange={() => handleCheckboxChange("transmission", trans)}
                            />
                            <span className="ml-2 text-sm">{trans === "automatic" ? "Automatique" : "Manuelle"}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="uppercase text-xs text-gray-500 mb-4 font-semibold">Prix par Jour</h2>
                <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min (DH)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                min="0"
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange("min", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max (DH)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                min="0"
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange("max", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="px-1 text-sm text-gray-600">
                        Plage de prix:{" "}
                        <span className="font-semibold text-green-600">
                            {priceRange.min} DH - {priceRange.max} DH
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarFilter
