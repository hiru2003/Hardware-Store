import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="brand">
                    <span>Hardware</span> <span>Store</span>
                </Link>
                <div className="nav-links">
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
