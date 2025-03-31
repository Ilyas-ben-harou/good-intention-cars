// src/components/admin/Register.js
import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminRegister = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, loading, error } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== passwordConfirmation) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            await register(nom,prenom, email, password, passwordConfirmation);
            navigate('/admin/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                // Format Laravel validation errors
                const messages = Object.values(errors).flat();
                setErrorMessage(messages.join('\n'));
            } else {
                setErrorMessage(err.response?.data?.message || 'Registration failed');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-box">
                <h2>Admin Registration</h2>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            placeholder="Enter your nom"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prenom">Prenom</label>
                        <input
                            type="text"
                            id="prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                            placeholder="Enter your prenom"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="auth-links">
                    <p>Already have an account? <Link to="/admin/login">Login</Link></p>
                    <p><Link to="/">Back to Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;