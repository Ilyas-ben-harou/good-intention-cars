import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaCar, FaCalendarAlt, FaShieldAlt, FaClipboardCheck, FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [carMenuOpen, setCarMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`bg-gray-900 text-white ${isMobile ? "" : "h-full w-64"} shadow-lg`}>
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#57D500]">GIC Admin</h1>
      </div>

      <nav className="py-4">
        <ul className={`${isMobile ? "flex flex-row justify-between" : "space-y-1"}`}>
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-3 hover:bg-gray-800 transition ${location.pathname === "/admin/dashboard" ? "bg-[#57D500] text-black font-medium" : ""}`}
            >
              <FaHome className="mr-3" />
              <span>Tableau de Bord</span>
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center px-4 py-3 hover:bg-gray-800 transition ${location.pathname.startsWith("/admin/users") ? "bg-[#57D500] text-black font-medium" : ""}`}
            >
              <FaUsers className="mr-3" />
              <span>Gestion Utilisateurs</span>
            </Link>
          </li>

          {/* Reservations */}
          <li>
            <Link
              to="/admin/reservations"
              className={`flex items-center px-4 py-3 hover:bg-gray-800 transition ${location.pathname.startsWith("/admin/reservations") ? "bg-[#57D500] text-black font-medium" : ""}`}
            >
              <FaCalendarAlt className="mr-3" />
              <span>Gestion Réservations</span>
            </Link>
          </li>

          {/* Gestion Véhicules */}
          <li className="relative">
            <button
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 transition focus:outline-none"
              onClick={() => setCarMenuOpen(!carMenuOpen)}
            >
              <div className="flex items-center">
                <FaCar className="mr-3" />
                <span>Gestion Véhicules</span>
              </div>
              <FaAngleDown className={`transition-transform size-5 ${carMenuOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute left-0 w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${carMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
              <Link
                to="/admin/cars"
                className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${location.pathname.startsWith("/admin/cars") ? "bg-[#57D500] text-black font-medium" : ""}`}
              >
                <FaCar className="mr-3" />
                <span>Liste des Véhicules</span>
              </Link>

              <Link
                to="/admin/assurances"
                className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${location.pathname.startsWith("/admin/assurances") ? "bg-[#57D500] text-black font-medium" : ""}`}
              >
                <FaShieldAlt className="mr-3" />
                <span>Liste des Assurances</span>
              </Link>

              <Link
                to="/admin/technical-visits"
                className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${location.pathname.startsWith("/admin/visites-techniques") ? "bg-[#57D500] text-black font-medium" : ""}`}
              >
                <FaClipboardCheck className="mr-3" />
                <span>Visites Techniques</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
