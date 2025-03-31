import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SectionHero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    // { src: "/images/dacia.jpg", alt: "Location de berline de luxe" },
    { src: "/images/texon.jpg", alt: "Location de SUV premium" },
    { src: "/images/clio.jpg", alt: "Location de voiture de sport" },
    // { src: "/images/i20.jpeg", alt: "Location de véhicule de direction" },
  ];

  // Rotation automatique des images toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Véhicules Premium</span>
                  <span className="block text-emerald-600">Solutions de Location</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                  Découvrez des services de location de véhicules accessibles n'importe quand, n'importe où.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start sm:space-x-4 space-y-3 sm:space-y-0">
                  <Link
                    to="#cars"
                    className="w-full sm:w-auto px-8 py-3 text-center text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow transition-colors duration-300"
                  >
                    Réserver Maintenant
                  </Link>
                  <Link
                    to="/about-us"
                    className="w-full sm:w-auto px-8 py-3 text-center text-emerald-700 border border-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-300"
                  >
                    En Savoir Plus
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              className={`absolute inset-0 w-full  object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Indicateurs d'image */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}