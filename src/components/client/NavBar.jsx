import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = [
        { to: "/", label: "Accueil" },
        { to: "/parc-auto", label: "Parc Auto" },
        { to: "/terms&conditions", label: "Conditions générales" },
        { to: "/about-us", label: "À propos de nous" },
        { to: "/contact", label: "Contact" },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full bg-white shadow-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                {/* Logo Section */}
                <NavLink to="/" className="flex items-center">
                    <img src="/images/logo.png" alt="Logo" className="w-[100px] object-cover" />
                </NavLink>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
                    {routes.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-medium transition-colors lg:px-4 lg:text-base ${
                                    isActive
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMenuOpen((prevState) => !prevState)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden bg-white border-t transition-all duration-300 ${
                    isMenuOpen ? "max-h-screen overflow-auto py-3 px-4" : "max-h-0 overflow-hidden"
                }`}
            >
                <div className="flex flex-col space-y-2">
                    {routes.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `rounded-md px-4 py-3 text-base font-medium transition ${
                                    isActive
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
