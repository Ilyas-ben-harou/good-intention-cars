import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ClientAuthContext = createContext();

export const ClientAuthProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('client_token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setToken = (newToken) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem('client_token', newToken);
        } else {
            localStorage.removeItem('client_token');
        }
    };

    // Create a separate axios instance for client requests
    const clientAxios = axios.create({
        baseURL: 'http://localhost:8000/api/client',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Configure axios to send the client token with every request
    clientAxios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('client_token');
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
        // Check if client is logged in on page load
        const loadClient = async () => {
            const token = localStorage.getItem('client_token');
            if (token) {
                try {
                    const response = await clientAxios.get('/profile');
                    setClient(response.data);
                } catch (err) {
                    console.error("Failed to fetch client profile:", err);
                    localStorage.removeItem('client_token');
                }
            }
            setLoading(false);
        };

        loadClient();
    }, []);

    const register = async (nom,prenom, email,phone, password, password_confirmation) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clientAxios.post('/register', {
                nom,
                prenom,
                email,
                phone,
                password,
                password_confirmation,
            });
            setToken(response.data.token)
            setClient(response.data.client);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setToken(null)
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clientAxios.post('/login', {
                email,
                password
            });

            setToken(response.data.token)
            setClient(response.data.client);
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
            await clientAxios.post('/logout');
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setToken(null)
            setClient(null);
            setLoading(false);
        }
    };

    return (
        <ClientAuthContext.Provider
            value={{
                client,
                token,
                loading,
                error,
                login,
                register,
                logout,
                setToken,
                isAuthenticated: !!client,
                clientAxios
            }}
        >
            {children}
        </ClientAuthContext.Provider>
    );
};

export const useClientAuth = () => useContext(ClientAuthContext);

export default ClientAuthContext;