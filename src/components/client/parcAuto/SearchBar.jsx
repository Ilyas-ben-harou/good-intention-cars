"use client"
import { Search } from "lucide-react"

const SearchBar = ({ search, setSearch, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (onSearch) onSearch(search)
    }

    return (
        <div className="bg-gray-50 rounded-xl shadow-md p-4">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    placeholder="Rechercher par marque ou modèle..."
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchBar

