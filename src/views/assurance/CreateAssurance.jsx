import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAxios } from "../../api/axios";

const CreateAssurance = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        car_id: "",
        company_name: "",
        policy_number: "",
        start_date: "",
        end_date: "",
        cost: "",
        status: "active",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    // Fetch cars to populate the dropdown
    useEffect(() => {
        adminAxios.get("/car")
            .then(response => setCars(response.data.cars))
            .catch(error => console.error("Error fetching cars:", error));
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        adminAxios.post("/assurance", formData)
            .then(response => {
                setSuccess("Assurance created successfully!");
                setTimeout(() => navigate(-1), 2000);
            })
            .catch(error => {
                setError("Failed to create assurance. Please try again.");
                console.error("Error:", error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create Assurance</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-500 mb-3">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Select Car */}
                <div>
                    <label className="block font-medium">Select Car:</label>
                    <select
                        name="car_id"
                        value={formData.car_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">-- Choose a Car --</option>
                        {cars.map(car => (
                            <option key={car.id} value={car.id}>
                                {car.id} - {car.marque} - {car.modele}
                                {/* {car.license_plate} */}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Company Name */}
                <div>
                    <label className="block font-medium">Company Name:</label>
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Policy Number */}
                <div>
                    <label className="block font-medium">Policy Number:</label>
                    <input
                        type="text"
                        name="policy_number"
                        value={formData.policy_number}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block font-medium">Start Date:</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block font-medium">End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Cost */}
                <div>
                    <label className="block font-medium">Cost:</label>
                    <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium">Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#57D500] text-white py-2 rounded-lg hover:bg-green-600 transition"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Create Assurance"}
                </button>
            </form>
        </div>
    );
};

export default CreateAssurance;
