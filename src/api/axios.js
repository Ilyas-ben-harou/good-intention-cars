import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Remplace par ton URL backend si nécessaire

// Instance Axios pour les administrateurs
export const adminAxios = axios.create({
    baseURL: `${BASE_URL}/admin`,
    headers: {
        "Content-Type": "application/json",
    },
});
adminAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Check if error is due to unauthorized access (token expired)
        if (error.response && (error.response.status === 401 || error.response.status === 419)) {
            // Clear any stored tokens
            localStorage.removeItem('admin_token');
            // Redirect to login page
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);
// Ajouter le token d'authentification pour les admins
adminAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("admin_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Instance Axios pour les clients
export const clientAxios = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

// // Ajouter le token d'authentification pour les clients
// clientAxios.interceptors.request.use(config => {
//     const token = localStorage.getItem("client_token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => Promise.reject(error));
