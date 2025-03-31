import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Liste des réseaux sociaux
  const socialLinks = [
    { icon: FaFacebook, name: "Facebook", url: "https://www.facebook.com" },
    { icon: FaInstagram, name: "Instagram", url: "https://www.instagram.com" },
    { icon: FaTwitter, name: "Twitter", url: "https://www.twitter.com" },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col">
            <img
              src="/images/logo2.png"
              alt="RentCars Logo"
              className=" object-cover w-[150px]"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=80&width=150";
                e.currentTarget.alt = "RentCars";
              }}
            />
          </div>

          {/* Localisation Section */}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Localisation</h3>
            <p className="mb-2">123 Rue de la Location, Marrakech, Maroc</p>
            <p className="mb-2">+212 123 456 789</p>
            <p>contact@rentcars.com</p>
          </div>

          {/* About RentCars Section */}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">À propos de RentCars</h3>
            <p>
              RentCars propose des voitures de qualité pour tous vos besoins de transport. 
              Nous offrons des services de location abordables et flexibles dans plusieurs villes.
            </p>
          </div>

          {/* Pages Section */}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Pages</h3>
            <ul className="space-y-2">
              {["Accueil", "À propos de nous", "Contact", "Parc Auto"].map((page, index) => (
                <li key={index}>
                  <Link to={`/${page.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map(({ icon: Icon, name, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                  aria-label={`Suivez-nous sur ${name}`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-800 text-center text-sm text-gray-400">
          &copy; {currentYear} RentCars. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
