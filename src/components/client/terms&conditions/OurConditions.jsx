"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content:
      'Les présentes conditions générales de location (ci-après dénommées les "Conditions") régissent la location de véhicules entre [Nom de l\'entreprise] (ci-après "nous" ou "le Loueur") et le locataire (ci-après "vous"). En signant le contrat de location, vous acceptez les présentes conditions sans réserve.',
  },
  {
    id: "identification",
    title: "2. Identification du Locataire",
    content:
      "Le locataire doit être une personne physique âgée d'au moins [âge minimum requis] ans, titulaire d'un permis de conduire valide depuis [nombre d'années requis] ans, et fournir une pièce d'identité ainsi qu'une carte bancaire valide.",
  },
  {
    id: "reservation",
    title: "3. Réservation",
    content:
      "Les réservations doivent être effectuées via notre site web ou par téléphone. Vous devez indiquer les dates et heures de début et de fin de la location, ainsi que le type de véhicule souhaité. Une confirmation de réservation vous sera envoyée une fois la transaction validée.",
  },
  {
    id: "tarifs",
    title: "4. Tarifs et Modalités de Paiement",
    content:
      "Les tarifs sont indiqués sur notre site web et peuvent varier en fonction du type de véhicule, de la durée de location et des options choisies. Le paiement complet doit être effectué avant ou au début de la location. Les moyens de paiement acceptés sont [préciser les moyens de paiement].",
  },
  {
    id: "duree",
    title: "5. Durée de la Location",
    content:
      "La durée de la location est définie par les dates et heures spécifiées lors de la réservation. Toute prolongation de la période de location devra être convenue avec le Loueur et fera l'objet de frais supplémentaires.",
  },
  {
    id: "livraison",
    title: "6. Livraison et Retour du Véhicule",
    content:
      "Le véhicule sera livré à l'adresse convenue ou récupéré au lieu spécifié lors de la réservation. Vous êtes tenu de retourner le véhicule dans l'état dans lequel il a été remis, avec tous les accessoires et documents qui l'accompagnent.",
  },
  {
    id: "assurance",
    title: "7. Assurance",
    content:
      "L'assurance de base est incluse dans la location, mais elle peut être complétée par des options supplémentaires telles que la protection contre le vol, les dommages ou la couverture tous risques. Les détails des couvertures sont disponibles sur demande. Vous êtes responsable de tout dommage non couvert par l'assurance.",
  },
  {
    id: "responsabilite",
    title: "8. Responsabilité",
    content:
      "Le locataire s'engage à conduire le véhicule conformément aux lois en vigueur et à ne pas l'utiliser pour des activités illégales. En cas d'infraction, le locataire sera seul responsable des amendes et des coûts associés.",
  },
  {
    id: "annulation",
    title: "9. Annulation et Modification",
    content:
      "Les annulations doivent être faites [X jours] avant la date de début de la location pour bénéficier d'un remboursement complet. Les modifications de la réservation sont possibles sous réserve de disponibilité et peuvent entraîner des frais supplémentaires.",
  },
  {
    id: "entretien",
    title: "10. Entretien et Carburant",
    content:
      "Le locataire doit veiller à l'entretien de base du véhicule pendant la période de location, notamment le niveau d'huile et de carburant. Le véhicule doit être restitué avec le réservoir plein. En cas de non-remise du véhicule avec un plein complet, des frais de carburant seront appliqués.",
  },
  {
    id: "kilometrage",
    title: "11. Limite de Kilométrage",
    content:
      "Une limite de kilométrage est fixée à [nombre de kilomètres] km par jour. Au-delà de cette limite, des frais supplémentaires seront facturés par kilomètre excédentaire.",
  },
  {
    id: "assistance",
    title: "12. Assistance",
    content:
      "En cas de panne ou d'accident, vous devez contacter immédiatement notre service d'assistance au [numéro de téléphone]. Nous fournirons une assistance dans les plus brefs délais, mais nous ne pourrons être tenus responsables des retards ou des coûts supplémentaires.",
  },
  {
    id: "restitution",
    title: "13. Restitution du Véhicule",
    content:
      "Le véhicule doit être restitué à la date et heure convenues. En cas de restitution tardive, des frais supplémentaires seront facturés pour chaque jour de retard.",
  },
  {
    id: "clause",
    title: "14. Clause de Non-Responsabilité",
    content:
      "Le Loueur ne pourra être tenu responsable en cas d'accident, vol, ou dommage causé au locataire, à des tiers, ou au véhicule en dehors des termes de la couverture d'assurance.",
  },
  {
    id: "modifications",
    title: "15. Modifications des Conditions",
    content:
      "Le Loueur se réserve le droit de modifier ces conditions générales de location à tout moment. Les modifications seront publiées sur notre site et seront applicables aux futures locations.",
  },
]

export default function OurConditions() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Conditions Générales</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center text-primary">Termes et Conditions de Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-secondary text-secondary-foreground">
                  <p>{section.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
