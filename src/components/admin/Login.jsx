import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login, loading, error } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Échec de la connexion');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Connexion Administrateur
                </h2>

                {(errorMessage || error) && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        {errorMessage || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Adresse e-mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md focus:ring-[#57D500] focus:border-[#57D500] focus:outline-none placeholder-gray-500 sm:text-sm"
                                placeholder="Adresse e-mail"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md focus:ring-[#57D500] focus:border-[#57D500] focus:outline-none placeholder-gray-500 sm:text-sm"
                                placeholder="Mot de passe"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                to="/admin/forgot-password"
                                className="font-medium text-[#57D500] hover:text-opacity-75"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 text-sm font-medium text-white bg-[#57D500] rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-[#57D500] hover:bg-opacity-75 disabled:bg-opacity-50"
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
