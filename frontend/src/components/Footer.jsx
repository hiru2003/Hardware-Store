import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="brand" style={{ color: 'white' }}>
                            PRO-<span>TOOLS</span>
                        </div>
                        <p>Providing the highest quality hardware and industrial equipment. Your trusted partner in construction and DIY.</p>
                        <div className="social-links">
                            <span>𝕏</span>
                            <span>📘</span>
                            <span>📸</span>
                            <span>▶️</span>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Browse All</Link></li>
                            <li><Link to="/auth">Account</Link></li>
                            <li><Link to="/cart">My Cart</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Customer Support</h4>
                        <ul>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns & Refunds</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© Pro-Tools Hardware Store. All rights reserved.</p>
                    <div className="payment-icons">
                        <span>💳</span>
                        <span>🅿️</span>
                        <span>🍎 Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
