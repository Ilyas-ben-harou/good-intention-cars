import { useState } from "react"
import { DollarSign, Users, Truck, LifeBuoy, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const WhyChooseUs = () => {
  const [imageError, setImageError] = useState(false)
  const placeholderImage = "/placeholder.svg?height=500&width=600"
  const carImage = "/images/WhatsApp Image 2025-03-07 à 00.33.20_f14a3836.jpg"

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "Meilleur prix garanti",
      description: "Vous trouvez un prix plus bas ? Nous vous remboursons 100% de la différence.",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Chauffeurs expérimentés",
      description: "Pas de chauffeur ? Ne vous inquiétez pas, nous avons plusieurs chauffeurs expérimentés pour vous.",
    },
    {
      icon: <Truck className="w-6 h-6 text-green-500" />,
      title: "Livraison de voiture en 24h",
      description: "Réservez votre voiture à tout moment et nous vous la livrerons directement.",
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-green-500" />,
      title: "Assistance technique 24/7",
      description: "Une question ? Contactez notre support à tout moment en cas de problème avec votre location.",
    },
  ]

  const stats = [
    { value: "15k+", label: "Clients satisfaits" },
    { value: "150+", label: "Voitures de qualité" },
    { value: "12+", label: "Années d'expérience" },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row items-center">
          {/* Partie gauche - Image de la voiture */}
          <div className="w-full lg:w-1/2 relative mb-12 lg:mb-0">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform lg:-translate-y-6 transition-transform duration-500 hover:-translate-y-8">
              <img
                src={carImage}
                alt="Voiture de location haut de gamme"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-50 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-green-50 rounded-full -z-10"></div>

            {/* Cartes de statistiques */}
            <div className="absolute -bottom-6 right-8 bg-white shadow-lg rounded-lg p-4 z-20">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partie droite - Texte et avantages */}
          <div className="w-full lg:w-1/2 lg:pl-16">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-1 text-sm font-medium rounded-full mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              POURQUOI NOUS CHOISIR
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Profitez de la meilleure expérience avec nos offres de location
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              Notre engagement envers un service de qualité et la satisfaction de nos clients nous distingue des autres services de location de voitures.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start">
                  <div className="flex-shrink-0 bg-green-50 p-3 rounded-full mr-4">{benefit.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton d'Appel à l'Action */}
            <div className="mt-10">
              <Link
                to="/about-us"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <span>En savoir plus sur nos services</span>
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs