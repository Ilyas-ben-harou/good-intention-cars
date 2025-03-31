import { Car } from "lucide-react"

const NoResults = () => {
    return (
        <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <Car className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune voiture trouvée</h3>
            <p className="text-gray-500 max-w-md">
                Aucune voiture ne correspond à vos critères actuels. Essayez d'ajuster vos filtres ou votre recherche.
            </p>
        </div>
    )
}

export default NoResults

