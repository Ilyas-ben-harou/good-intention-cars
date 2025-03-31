const GoogleMaps = () => {
  // Coordonnées de votre entreprise
  const latitude = 31.626328; // Marrakech
  const longitude = -7.973212;
  const businessName = "Desire Cars Marrakech"; // Nom de l'entreprise

  // URL Google Maps (sans API key)
  const simpleMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Notre Localisation</h2>
          <p className="mt-4 text-lg text-gray-500">
            Venez nous rendre visite ou contactez-nous pour obtenir des indications.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <iframe
            title="Notre Localisation"
            src={simpleMapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            aria-label={`Carte indiquant la localisation de ${businessName}`}
          ></iframe>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            <strong>{businessName}</strong>
            <br />
            Marrakech, Maroc
            <br />
            Téléphone : +212 123 456 789
          </p>
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Obtenir l'itinéraire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
