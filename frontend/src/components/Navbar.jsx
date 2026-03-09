import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItemCount, isAuthenticated, username, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) onLogout();
        navigate('/auth');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="brand">
                    <span>Hardware</span> <span>Store</span>
                </Link>
                <div className="nav-links">
                    {isAuthenticated && (
                        <>
                            <Link
                                to="/"
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                            >
                                Products
                            </Link>
                            <Link
                                to="/cart"
                                className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                            >
                                <div className="cart-icon-wrapper">
                                    <span>Cart</span>
                                    {cartItemCount > 0 && (
                                        <span className="badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
                                    )}
                                </div>
                            </Link>
                            <span className="nav-user">Hi, {username || 'User'}</span>
                            <button
                                type="button"
                                className="btn btn-logout"
                                onClick={handleLogout}
                                aria-label="Log out"
                            >
                                Log out
                            </button>
                        </>
                    )}
                    {!isAuthenticated && (
                        <button
                            type="button"
                            className="btn btn-primary nav-signin-btn"
                            onClick={() => navigate('/auth')}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
