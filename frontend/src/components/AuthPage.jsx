import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const AuthPage = ({ onAuthSuccess }) => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleMode = (nextMode) => {
        setMode(nextMode);
        setError('');
        if (nextMode === 'login') setEmail('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter your username and password.');
            return;
        }
        if (mode === 'register' && !email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        setLoading(true);
        try {
            const payload = mode === 'login'
                ? { username: username.trim(), password: password.trim() }
                : { username: username.trim(), email: email.trim(), password: password.trim() };
            const response = mode === 'login'
                ? await loginUser(payload)
                : await registerUser(payload);

            const token = response.data?.token;
            if (token) {
                window.localStorage.setItem('authToken', token);
                window.localStorage.setItem('authUsername', payload.username);
                if (onAuthSuccess) onAuthSuccess(token, payload.username);
                window.location.href = '/';
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            const msg = err.response?.data;
            if (err.response?.status === 401) {
                setError(typeof msg === 'string' ? msg : 'Invalid username or password.');
            } else if (err.response?.status === 409) {
                setError(typeof msg === 'string' ? msg : 'Username or email already in use.');
            } else {
                setError('Unable to connect. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-ecom">
            <div className="auth-ecom-bg" />
            <div className="auth-ecom-wrap">
                <div className="auth-ecom-card">
                    <Link to="/" className="auth-ecom-logo">
                        <span className="auth-ecom-logo-primary">Hardware</span>
                        <span className="auth-ecom-logo-secondary">Store</span>
                    </Link>

                    <div className="auth-ecom-tabs">
                        <button
                            type="button"
                            className={`auth-ecom-tab ${mode === 'login' ? 'active' : ''}`}
                            onClick={() => toggleMode('login')}
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            className={`auth-ecom-tab ${mode === 'register' ? 'active' : ''}`}
                            onClick={() => toggleMode('register')}
                        >
                            Create account
                        </button>
                    </div>

                    <h1 className="auth-ecom-title">
                        {mode === 'login' ? 'Welcome back' : 'Create your account'}
                    </h1>
                    <p className="auth-ecom-subtitle">
                        {mode === 'login'
                            ? 'Sign in with your username and password to continue shopping.'
                            : 'Register with your email to start shopping.'}
                    </p>

                    <form className="auth-ecom-form" onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            <div className="auth-ecom-field">
                                <label htmlFor="auth-email">Email address</label>
                                <input
                                    id="auth-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                        )}

                        <div className="auth-ecom-field">
                            <label htmlFor="auth-username">Username</label>
                            <input
                                id="auth-username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="auth-ecom-field">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                id="auth-password"
                                type="password"
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={mode === 'login' ? 'Enter your password' : 'At least 6 characters'}
                            />
                        </div>

                        {error && (
                            <div className="auth-ecom-error" role="alert">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary auth-ecom-submit"
                            disabled={loading}
                        >
                            {loading
                                ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
                                : (mode === 'login' ? 'Sign in' : 'Create account')}
                        </button>
                    </form>

                    <p className="auth-ecom-switch">
                        {mode === 'login' ? (
                            <>
                                New to Hardware Store?{' '}
                                <button type="button" className="auth-ecom-switch-link" onClick={() => toggleMode('register')}>
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button type="button" className="auth-ecom-switch-link" onClick={() => toggleMode('login')}>
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>

                    <div className="auth-ecom-trust">
                        <span className="auth-ecom-trust-icon">🔒</span>
                        <span>Secure sign-in. We never share your data.</span>
                    </div>
                </div>

                <p className="auth-ecom-footer">
                    By continuing, you agree to our Terms of Use and Privacy Notice.
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
