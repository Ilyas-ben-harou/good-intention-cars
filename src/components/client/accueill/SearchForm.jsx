import { Search } from "lucide-react"
import { useEffect, useState, useRef } from "react";

export default function SearchForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const dropdownRef = useRef(null);
  
  // List of Moroccan cities
  const moroccoCities = [
    "Agadir", "Al Hoceima", "Asilah", "Azemmour", "Azrou", "Beni Mellal", 
    "Berkane", "Berrechid", "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", 
    "Erfoud", "Essaouira", "Fez", "Fnideq", "Guelmim", "Ifrane", "Kenitra", 
    "Khenifra", "Khouribga", "Laayoune", "Larache", "Marrakech", "Meknes", 
    "Mohammedia", "Nador", "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", 
    "Sefrou", "Settat", "Sidi Ifni", "Tangier", "Tan-Tan", "Taroudant", 
    "Taza", "Tetouan", "Tiznit"
  ];
  
  // Filter cities based on search term
  const filteredCities = moroccoCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="w-full bg-yellow-100-500/50 p-4 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
            Réservation
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Location Pickup */}
            <div className="w-full max-w-md mx-auto p-4">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-full p-2 border rounded flex justify-between items-center cursor-pointer bg-white"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selectedCity || 'Select a city'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isOpen && (
                  <div className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border rounded shadow-lg z-10">
                    <div className="sticky top-0 bg-white p-2 border-b">
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Search for a city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <div
                          key={city}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedCity(city);
                            setIsOpen(false);
                            setSearchTerm('');
                          }}
                        >
                          {city}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No cities found</div>
                    )}
                  </div>
                )}
              </div>

              {selectedCity && (
                <div className="mt-4 p-2 bg-blue-50 text-blue-700 rounded">
                  You selected: <strong>{selectedCity}</strong>
                </div>
              )}
            </div>

            {/* Departure Date/Time */}
            <div className="relative">
              <div className="border-1 flex items-center bg-white rounded-lg p-3 gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="datetime-local"
                  className="w-full bg-transparent outline-none text-gray-700"
                  defaultValue="2025-03-07T10:00"
                  aria-label="Pickup date and time"
                />
              </div>
            </div>

            {/* Return Location */}
            <div className="relative">
              <div className="border-1 flex items-center bg-white rounded-lg p-3 gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V7M12 21V17M3 14H7M17 14H21"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <select className="w-full bg-transparent outline-none text-gray-700" aria-label="Return location">
                  <option>Marrakech (Agence)</option>
                  <option>Casablanca</option>
                  <option>Rabat</option>
                  <option>Agadir</option>
                </select>
              </div>
            </div>

            {/* Return Date/Time */}
            <div className="relative">
              <div className="border-1 flex items-center bg-white rounded-lg p-3 gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="datetime-local"
                  className="w-full bg-transparent outline-none text-gray-700"
                  defaultValue="2025-03-10T10:00"
                  aria-label="Return date and time"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              aria-label="Search for available cars"
            >
              <Search className="w-5 h-5" />
              Recherche
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
