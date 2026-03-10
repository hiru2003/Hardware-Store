import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItemCount, isAuthenticated, username, role, onLogout }) => {
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
                    PRO-<span>TOOLS</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
                        Products
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {role === 'ADMIN' ? (
                                <Link
                                    to="/admin"
                                    className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                                >
                                    Dashboard
                                </Link>
                            ) : (
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
                            )}
                            <div className="nav-user-wrap">
                                <span className="nav-user">{username || 'User'}</span>
                                <button
                                    type="button"
                                    className="btn-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/auth" className="btn btn-primary nav-signin-btn">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
