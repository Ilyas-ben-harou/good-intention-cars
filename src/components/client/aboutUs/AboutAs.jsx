import { useState } from "react"
import { DollarSign, Users, Truck, LifeBuoy, Shield, Clock, Map, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"

export default function AboutUs() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Services data
  const services = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Garantie du Meilleur Prix",
      description:
        "Nous vous offrons les meilleurs tarifs du marché. Si vous trouvez un prix plus bas pour la même voiture, nous nous alignons et vous offrons 10 % de réduction.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Conducteurs Professionnels",
      description:
        "Nos conducteurs sont qualifiés et expérimentés, offrant des trajets sûrs et confortables pour vos transferts ou déplacements.",
    },
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: "Livraison 24/7",
      description:
        "Nous livrons les voitures 24h/24 et 7j/7, à l’heure et à l’endroit de votre choix, sans frais supplémentaires.",
    },
    {
      icon: <LifeBuoy className="w-8 h-8 text-green-500" />,
      title: "Support Client",
      description:
        "Notre équipe est disponible 24/7 pour vous assister, que ce soit pour une réservation, une question ou un problème urgent.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Assurance Complète",
      description:
        "Tous nos véhicules sont couverts par une assurance complète, avec des options supplémentaires disponibles pour plus de sécurité.",
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "Périodes Flexibles",
      description:
        "Nous offrons des locations horaires, journalières et à long terme avec des prix clairs et compétitifs, sans frais cachés.",
    },
    {
      icon: <Map className="w-8 h-8 text-green-500" />,
      title: "Multiples Locations",
      description:
        "Récupérez et retournez votre véhicule dans différents points de la ville ou des aéroports, selon votre itinéraire.",
    },
    {
      icon: <Star className="w-8 h-8 text-green-500" />,
      title: "Programme de Fidélité",
      description:
        "Gagnez des points à chaque location et échangez-les contre des réductions, des surclassements ou des jours gratuits.",
    },
  ]
  

  // FAQ data
  const faqs = [
    {
      question: "Quels documents faut-il pour louer une voiture ?",
      answer:
        "Pour louer une voiture, vous devez fournir un permis de conduire valide, une carte de crédit à votre nom, et une pièce d'identité (passeport ou carte d'identité). Les clients internationaux doivent également avoir leur passeport, un permis de conduire international et le permis de conduire de leur pays d'origine.",
    },
    {
      question: "Un dépôt de garantie est-il nécessaire ?",
      answer:
        "Oui, nous demandons un dépôt de garantie dont le montant varie selon la catégorie du véhicule. Le dépôt est entièrement remboursable lors du retour du véhicule dans le même état que lors de la location. Le dépôt est réservé sur votre carte de crédit et sera libéré après l'inspection du véhicule.",
    },
    {
      question: "Puis-je ajouter un conducteur supplémentaire à ma location ?",
      answer:
        "Oui, vous pouvez ajouter des conducteurs supplémentaires à votre location. Chaque conducteur supplémentaire doit respecter nos conditions de location et présenter son permis de conduire. Des frais journaliers seront appliqués pour chaque conducteur supplémentaire et seront ajoutés au coût total de votre location.",
    },
    {
      question: "Quelle est votre politique de carburant ?",
      answer:
        "Nous fournissons le véhicule avec un plein de carburant et attendons qu'il soit retourné avec un plein. Si le véhicule n'est pas retourné avec un plein, des frais pour carburant manquant et un supplément pour le service de ravitaillement seront appliqués.",
    },
    {
      question: "Que se passe-t-il si je rends la voiture en retard ?",
      answer:
        "Nous accordons une période de grâce de 30 minutes pour les retours. Passé ce délai, des frais horaires seront appliqués, jusqu'à un maximum de la location d'une journée complète. Si vous savez que vous serez en retard, veuillez contacter notre service client dès que possible.",
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">À propos de notre service de location de voitures premium</h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez pourquoi des milliers de clients nous choisissent pour leurs besoins en transport et comment nous redéfinissons l'expérience de location de voitures.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-gray-600">Trouvez les réponses aux questions courantes sur nos services de location de voitures.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium text-gray-900 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index ? "true" : "false"}
                  aria-controls={`faq-${index}`}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && <div id={`faq-${index}`} className="px-6 pb-4 text-gray-600">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à vivre l'expérience de notre service premium de location de voitures ?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui nous font confiance pour leurs besoins en transport.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-300">
              Parcourez notre flotte
            </button>
            <Link
              to="/parc-auto"
              className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Réservez maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
