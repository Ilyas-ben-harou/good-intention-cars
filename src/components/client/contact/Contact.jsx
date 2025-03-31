"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    if (!form.current) {
      setFeedback({ type: "error", message: "Erreur : le formulaire est introuvable." });
      setLoading(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        "service_zkcvt71", // Remplacez par votre EmailJS Service ID
        "template_c7o1o7g", // Remplacez par votre EmailJS Template ID
        form.current,
        "vQ_D254xfysEpKTi0" // Remplacez par votre EmailJS Public Key
      );

      if (result.text === "OK") {
        setFeedback({ type: "success", message: "Votre message a été envoyé avec succès !" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Échec de l'envoi du message.");
      }
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Une erreur s'est produite." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-16">
          {/* Section Contact Info */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contactez-nous</h2>
            <p className="text-lg text-gray-600 mb-8">
              Une question ou besoin d’assistance ? Notre équipe est à votre disposition. Contactez-nous via l’un des moyens suivants :
            </p>

            <div className="space-y-6">
              {[ 
                { icon: <Phone className="w-6 h-6 text-green-500" />, title: "Support téléphonique", info1: "+33 1 23 45 67 89", info2: "Disponible 24/7" },
                { icon: <Mail className="w-6 h-6 text-green-500" />, title: "Email", info1: "support@locationvoiture.com", info2: "Réponse sous 24h" },
                { icon: <MapPin className="w-6 h-6 text-green-500" />, title: "Siège social", info1: "123 Avenue de la Location", info2: "75001 Paris, France" }
              ].map(({ icon, title, info1, info2 }) => (
                <div key={title} className="flex items-start">
                  <div className="flex-shrink-0 bg-green-50 p-3 rounded-full mr-4">{icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                    <p className="text-gray-600">{info1}</p>
                    <p className="text-gray-600">{info2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Formulaire */}
          <div className="lg:w-1/2">
            <form ref={form} onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Votre email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Sujet" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Votre message" rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6"></textarea>
              <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
            
            {/* Messages de feedback */}
            {feedback.message && (
              <p className={`mt-4 ${feedback.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {feedback.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
