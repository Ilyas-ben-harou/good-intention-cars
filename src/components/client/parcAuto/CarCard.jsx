import { Link } from "react-router-dom"
import { Fuel, DoorClosed, Users } from "lucide-react"

import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"

export default function CarCard({ car }) {
    // Parse photos if it's a JSON string
    const photos = typeof car.photos === "string" ? JSON.parse(car.photos) : car.photos
    const mainPhoto = Array.isArray(photos) ? photos[0] : photos

    return (
        <Card className="bg-white overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative aspect-[4/3] w-full bg-gray-100">
                <Link to={`/car/${car.id}`} className="block w-full h-full">
                    <img
                        src={`http://localhost:8000/storage/${mainPhoto}`}
                        alt={car.marque}
                        className="object-cover rounded-t-lg w-full h-full"
                    />
                </Link>
            </div>

            <CardContent className="p-4">
                {/* Main info */}
                <div className="mb-4">
                    <h3 className="font-semibold text-xl text-gray-900">{car.marque}</h3>
                    <p className="text-sm text-gray-500">{car.modele}</p>
                </div>

                {/* Features */}
                <div className="flex justify-between text-sm text-gray-600 border-t pt-3 mb-4">
                    <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-1 text-gray-400" />
                        {car.fuel_type}
                    </div>
                    <div className="flex items-center">
                        <DoorClosed className="h-4 w-4 mr-1 text-gray-400" />
                        {car.dors} portes
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {car.passengers} pass.
                    </div>
                </div>

                {/* Price and button */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-lg text-gray-900">
                            {car.prixByDay} DH<span className="text-xs text-gray-500">/jour</span>
                        </p>
                        {car.originalPrice && <p className="text-xs text-gray-400 line-through">{car.originalPrice} DH</p>}
                    </div>
                    <Link to={`/rent-car/${car.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg"
                    >Louer</Link>

                </div>
            </CardContent>
        </Card>
    )
}

