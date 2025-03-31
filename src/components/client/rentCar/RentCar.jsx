"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Fuel, DoorClosed, Users, Calendar, MapPin, Navigation, Baby } from "lucide-react"
import { format, differenceInDays, addDays } from "date-fns"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Link, useNavigate, useParams } from "react-router-dom"
import { clientAxios } from "../../../api/axios"

// List of Moroccan airports
const airports = [
    { id: 1, name: "Aéroport Marrakech-Ménara", location: "Marrakech" },
    { id: 2, name: "Aéroport de Casablanca-Mohammed V", location: "Casablanca" },
    { id: 3, name: "Aéroport d'Agadir-Al Massira", location: "Agadir" },
    { id: 4, name: "Aéroport de Rabat-Salé", location: "Rabat/Salé" },
    { id: 5, name: "Aéroport de Oujda-Angads", location: "Oujda" },
    { id: 6, name: "Aéroport de Fès-Sais", location: "Fès" },
    { id: 7, name: "Aéroport de Tanger-Ibn Batouta", location: "Tanger" },
    { id: 8, name: "Aéroport de Ouarzazate", location: "Ouarzazate" },
    { id: 9, name: "Aéroport de Nador-El Aroui", location: "Nador" },
    { id: 10, name: "Aéroport d'Essaouira-Mogador", location: "Essaouira" },
    { id: 11, name: "Aéroport d'Al Hoceima-Chérif El Idrissi", location: "Al Hoceima" },
    { id: 12, name: "Aéroport d'Errachidia-Moulay Ali Chérif", location: "Errachidia" },
    { id: 13, name: "Aéroport de Tétouan-Saniat R'mel", location: "Tétouan" },
    { id: 14, name: "Aéroport de Dakhla", location: "Dakhla" },
]

// Extra services prices
const GPS_PRICE = 25
const BABY_SEAT_PRICE = 35

const RentCar = () => {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        client_nom_complete: "",
        client_phone: "",
        pickup_location: "",
        dropoff_location: "",
        date_debut: format(new Date(), "yyyy-MM-dd"),
        date_fin: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        gps: false,
        baby_seat: false,
    })

    // Location dropdown state
    const [pickupDropdownOpen, setPickupDropdownOpen] = useState(false)
    const [dropoffDropdownOpen, setDropoffDropdownOpen] = useState(false)
    const [pickupSearchTerm, setPickupSearchTerm] = useState("")
    const [dropoffSearchTerm, setDropoffSearchTerm] = useState("")
    const pickupDropdownRef = useRef(null)
    const dropoffDropdownRef = useRef(null)

    const [montantTotal, setMontantTotal] = useState(0)
    const [numberOfDays, setNumberOfDays] = useState(1)

    // Filter airports based on search terms
    const filteredPickupAirports = airports.filter(
        (airport) =>
            airport.name.toLowerCase().includes(pickupSearchTerm.toLowerCase()) ||
            airport.location.toLowerCase().includes(pickupSearchTerm.toLowerCase()),
    )

    const filteredDropoffAirports = airports.filter(
        (airport) =>
            airport.name.toLowerCase().includes(dropoffSearchTerm.toLowerCase()) ||
            airport.location.toLowerCase().includes(dropoffSearchTerm.toLowerCase()),
    )

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickupDropdownRef.current && !pickupDropdownRef.current.contains(event.target)) {
                setPickupDropdownOpen(false)
            }
            if (dropoffDropdownRef.current && !dropoffDropdownRef.current.contains(event.target)) {
                setDropoffDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Fetch car data
    useEffect(() => {
        const fetchCar = async () => {
            console.log(id)
            try {
                // For demo purposes, creating mock data
                // In production, replace with actual API call:
                await clientAxios.get(`/car/${id}`)
                    .then(response => {
                        setCar(response.data.car)
                        setLoading(false)
                    })


                // Mock data for demonstration
                const mockCar = {
                    id: "1",
                    marque: "Toyota",
                    modele: "Corolla",
                    fuel_type: "Gasoline",
                    dors: 4,
                    passengers: 5,
                    prixByDay: 350,
                    photos: JSON.stringify(["/placeholder.svg?height=300&width=500"]),
                }


            } catch (error) {
                console.error("Error fetching car details:", error)
                setLoading(false)
            }
        }
        fetchCar()
    }, [id])

    // Calculate total price whenever relevant form data changes
    useEffect(() => {
        if (car) {
            calculateTotal()
        }
    }, [formData, car])

    // Update form data and recalculate days when dates change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })

        if (name === "date_debut" || name === "date_fin") {
            const pickup = name === "date_debut" ? new Date(value) : new Date(formData.date_debut)
            const dropoff = name === "date_fin" ? new Date(value) : new Date(formData.date_fin)

            const days = Math.max(1, differenceInDays(dropoff, pickup))
            setNumberOfDays(days)
        }
    }

    // Calculate total price
    const calculateTotal = () => {
        if (!car) return

        // Base price calculation
        const basePrice = car.prixByDay * numberOfDays

        // Add optional extras
        let extras = 0
        if (formData.gps) extras += GPS_PRICE
        if (formData.baby_seat) extras += BABY_SEAT_PRICE

        // Total price
        setMontantTotal(basePrice + extras)
    }

    // Handle airport selection
    const handleAirportSelection = (type, airport) => {
        setFormData({
            ...formData,
            [type === "pickup" ? "pickup_location" : "dropoff_location"]: airport.name,
        })

        if (type === "pickup") {
            setPickupDropdownOpen(false)
            setPickupSearchTerm("")
        } else {
            setDropoffDropdownOpen(false)
            setDropoffSearchTerm("")
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !formData.client_nom_complete ||
            !formData.client_phone
        ) {
            alert("Please fill in all required fields")
            return
        }

        const reservationData = {
            client_nom_complete: formData.client_nom_complete,
            client_phone: formData.client_phone,
            car_id: id,
            pickup_location: formData.pickup_location,
            dropoff_location: formData.dropoff_location,
            date_debut: formData.date_debut,
            date_fin: formData.date_fin,
            montantTotal: montantTotal,
            gps: formData.gps,
            baby_seat: formData.baby_seat,
            status:'coming',
            payment_status:'not made',
            status_client:'pending'
        }

        console.log("Reservation data:", reservationData)

        // In production, uncomment and update this code:
        try {
            const response = await clientAxios.post('/reservation',reservationData)
            alert(response.data.message,'we will call you soon as we can for confirmation')
            
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('There was an error processing your reservation. Please try again.');
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (!car) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <Link to="/parc-auto" className="back-button">← Back to cars</Link>
                    <h2 className="text-2xl font-bold text-red-600">Car not found</h2>
                    <p className="mt-2">The car you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Rent a Car</h1>
            <button onClick={()=>navigate(-1)} className="back-button">← Back to cars</button>
            {/* Car Information Section */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-4 md:mb-0">
                            <img
                                src={`http://localhost:8000/storage/${JSON.parse(car.photos)[0]}`}
                                alt={`${car.marque} ${car.modele}`}
                                className="w-full h-48 object-contain rounded-lg"
                            />
                        </div>

                        <div className="md:w-2/3 md:pl-6">
                            <h2 className="text-2xl font-bold">
                                {car.marque} {car.modele}
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                                <div className="flex items-center">
                                    <Fuel className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>{car.fuel_type}</span>
                                </div>
                                <div className="flex items-center">
                                    <DoorClosed className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>{car.dors} doors</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>{car.passengers} passengers</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-lg">
                                    <span className="font-bold text-2xl text-green-600">{car.prixByDay} DH</span>
                                    <span className="text-gray-500 ml-1">/day</span>
                                </p>
                                {car.originalPrice && <p className="text-sm text-gray-500 line-through">{car.originalPrice} DH</p>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pickup & Dropoff Section */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Pickup & Return Details</h2>

                        {/* Pickup Location */}
                        <div className="mb-4">
                            <Label className="flex items-center mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                Pickup Location
                            </Label>
                            <div className="relative" ref={pickupDropdownRef}>
                                <div
                                    className="w-full p-2 border rounded flex justify-between items-center cursor-pointer bg-white"
                                    onClick={() => setPickupDropdownOpen(!pickupDropdownOpen)}
                                >
                                    <span>{formData.pickup_location || "Select pickup location"}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${pickupDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {pickupDropdownOpen && (
                                    <div className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border rounded shadow-lg z-10">
                                        <div className="sticky top-0 bg-white p-2 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="text"
                                                    className="w-full pl-8"
                                                    placeholder="Search for a location..."
                                                    value={pickupSearchTerm}
                                                    onChange={(e) => setPickupSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                        </div>

                                        {filteredPickupAirports.length > 0 ? (
                                            filteredPickupAirports.map((airport) => (
                                                <div
                                                    key={airport.id}
                                                    className="p-2 hover:bg-gray-100 text-black cursor-pointer"
                                                    onClick={() => handleAirportSelection("pickup", airport)}
                                                >
                                                    <div className="font-medium">{airport.name}</div>
                                                    <div className="text-sm text-gray-500">{airport.location}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-500">No locations found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pickup Date */}
                        <div className="mb-4">
                            <Label className="flex items-center mb-2">
                                <Calendar className="h-4 w-4 mr-1" />
                                Pickup Date
                            </Label>
                            <Input
                                type="date"
                                name="date_debut"
                                value={formData.date_debut}
                                onChange={handleInputChange}
                                min={format(new Date(), "yyyy-MM-dd")}
                                required
                            />
                        </div>

                        {/* Dropoff Location */}
                        <div className="mb-4">
                            <Label className="flex items-center mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                Dropoff Location
                            </Label>
                            <div className="relative" ref={dropoffDropdownRef}>
                                <div
                                    className="w-full p-2 border rounded flex justify-between items-center cursor-pointer bg-white"
                                    onClick={() => setDropoffDropdownOpen(!dropoffDropdownOpen)}
                                >
                                    <span>{formData.dropoff_location || "Select dropoff location"}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${dropoffDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {dropoffDropdownOpen && (
                                    <div className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border rounded shadow-lg z-10">
                                        <div className="sticky top-0 bg-white p-2 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="text"
                                                    className="w-full pl-8"
                                                    placeholder="Search for a location..."
                                                    value={dropoffSearchTerm}
                                                    onChange={(e) => setDropoffSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                        </div>

                                        {filteredDropoffAirports.length > 0 ? (
                                            filteredDropoffAirports.map((airport) => (
                                                <div
                                                    key={airport.id}
                                                    className="p-2 hover:bg-gray-100 text-black cursor-pointer"
                                                    onClick={() => handleAirportSelection("dropoff", airport)}
                                                >
                                                    <div className="font-medium">{airport.name}</div>
                                                    <div className="text-sm text-gray-500">{airport.location}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-500">No locations found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropoff Date */}
                        <div className="mb-4">
                            <Label className="flex items-center mb-2">
                                <Calendar className="h-4 w-4 mr-1" />
                                Dropoff Date
                            </Label>
                            <Input
                                type="date"
                                name="date_fin"
                                value={formData.date_fin}
                                onChange={handleInputChange}
                                min={formData.date_debut}
                                required
                            />
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">
                                Rental Duration:{" "}
                                <span className="font-semibold">
                                    {numberOfDays} day{numberOfDays > 1 ? "s" : ""}
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Add-ons & Personal Information Section */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Extras & Personal Information</h2>

                        <div className="mb-6 space-y-3">
                            <h3 className="font-medium text-gray-700">Optional Extras</h3>

                            <div className="flex items-center justify-between py-2 border-b">
                                <div className="flex items-center">
                                    <Navigation className="h-5 w-5 mr-2 text-green-600" />
                                    <span>GPS Navigation</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">{GPS_PRICE} DH</span>
                                    <Checkbox
                                        id="gps"
                                        name="gps"
                                        checked={formData.gps}
                                        onCheckedChange={(checked) => setFormData({ ...formData, gps: checked === true })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b">
                                <div className="flex items-center">
                                    <Baby className="h-5 w-5 mr-2 text-green-600" />
                                    <span>Baby Seat</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">{BABY_SEAT_PRICE} DH</span>
                                    <Checkbox
                                        id="baby_seat"
                                        name="baby_seat"
                                        checked={formData.baby_seat}
                                        onCheckedChange={(checked) => setFormData({ ...formData, baby_seat: checked === true })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <h3 className="font-medium text-gray-700">Personal Information</h3>

                            <div>
                                <Label htmlFor="client_nom_complete">Full Name</Label>
                                <Input
                                    id="client_nom_complete"
                                    type="text"
                                    name="client_nom_complete"
                                    value={formData.client_nom_complete}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="client_phone">Phone Number</Label>
                                <Input
                                    id="client_phone"
                                    type="tel"
                                    name="client_phone"
                                    value={formData.client_phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary & Confirmation Section */}
                <Card className="md:col-span-2">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Car Rental ({numberOfDays} day{numberOfDays > 1 ? "s" : ""})
                                </span>
                                <span>{car.prixByDay * numberOfDays} DH</span>
                            </div>

                            {formData.gps && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">GPS Navigation</span>
                                    <span>{GPS_PRICE} DH</span>
                                </div>
                            )}

                            {formData.baby_seat && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Baby Seat</span>
                                    <span>{BABY_SEAT_PRICE} DH</span>
                                </div>
                            )}

                            <div className="border-t pt-2 mt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-green-600">{montantTotal} DH</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> By submitting this form, you agree to the rental terms and conditions. Payment
                                status will be set to "not made" by default. You can pay at our office during pickup. Your reservation
                                will be marked as "pending" until approved by our team.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
                        >
                            Confirm Reservation
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default RentCar