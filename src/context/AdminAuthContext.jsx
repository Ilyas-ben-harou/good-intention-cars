// src/context/AdminAuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext({
    admin: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
})

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('admin_token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setToken = (newToken) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem('admin_token', newToken);
        } else {
            localStorage.removeItem('admin_token');
        }
    };

    // Create a separate axios instance for admin requests
    const adminAxios = axios.create({
        baseURL: 'http://localhost:8000/api/admin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Configure axios to send the admin token with every request
    adminAxios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('admin_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        // Check if admin is logged in on page load
        const loadAdmin = async () => {
            const token = localStorage.getItem('admin_token');
            if (token) {
                try {
                    const response = await adminAxios.get('/profile');
                    setAdmin(response.data.admin);
                    setToken(response.data.token);
                } catch (err) {
                    console.error("Failed to fetch admin profile:", err);
                    console.log("Error response:", err.response?.data);
                    // Don't remove token automatically on all errors
                    if (err.response?.status === 401) {
                        console.log("Unauthorized error - removing token");
                        localStorage.removeItem('admin_token');
                        
                    }
                }
            }
            setLoading(false);
        };
    
        loadAdmin();
    }, []);
    
    
    

    const register = async (nom,prenom, email, password, password_confirmation) => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminAxios.post('/register', {
                nom,
                prenom,
                email,
                password,
                password_confirmation
            });

            localStorage.setItem('admin_token', response.data.token);
            setAdmin(response.data.admin);
            setToken(response.data.token)
            return response.data;
        } catch (err) {
            setToken(null)
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminAxios.post('/login', {
                email,
                password
            });

            localStorage.setItem('admin_token', response.data.token);
            setAdmin(response.data.admin);
            setToken(response.data.token)
            return response.data;
        } catch (err) {
            setToken(null)
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await adminAxios.post('/logout');
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setToken(null)
            setAdmin(null);
            setLoading(false);
        }
    };

    return (
        <AdminAuthContext.Provider
            value={{
                admin,
                token,
                setToken,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!admin,
                adminAxios
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export default AdminAuthContext;