import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = [
        { name: 'Power Tools', icon: '⚡', color: '#fff7ed', border: '#ffedd5' },
        { name: 'Hand Tools', icon: '🔧', color: '#f0f9ff', border: '#e0f2fe' },
        { name: 'Measuring', icon: '📏', color: '#f5f3ff', border: '#ede9fe' },
        { name: 'Safety', icon: '🦺', color: '#fdf2f8', border: '#fce7f3' },
        { name: 'Storage', icon: '📦', color: '#ecfdf5', border: '#d1fae5' },
        { name: 'Gardening', icon: '🌱', color: '#fefce8', border: '#fef9c3' },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="premium-hero">
                <div className="container">
                    <div className="hero-content">
                        <span className="hero-badge">Est. 2024 • Professional Grade</span>
                        <h1>Build Your Legacy with <span>Pro-Tools</span></h1>
                        <p>Experience the ultimate precision and power with our curated collection of industrial-grade hardware and equipment.</p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-lg">Shop Collection</Link>
                            <a href="#featured" className="btn btn-secondary btn-lg">View Featured</a>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-num">5k+</span>
                                <span className="stat-label">Products</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">24/7</span>
                                <span className="stat-label">Support</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">Free</span>
                                <span className="stat-label">Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="categories-section" id="featured">
                <div className="container">
                    <div className="section-header">
                        <h2>Explore by Category</h2>
                        <p>Find exactly what you need for your next big project</p>
                    </div>
                    <div className="category-grid">
                        {categories.map((cat, idx) => (
                            <Link to={`/products?category=${cat.name}`} key={idx} className="category-card" style={{ backgroundColor: cat.color, borderColor: cat.border }}>
                                <span className="cat-icon">{cat.icon}</span>
                                <span className="cat-name">{cat.name}</span>
                                <span className="cat-arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="features-section">
                <div className="container">
                    <div className="feature-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🛡️</div>
                            <h3>Lifetime Warranty</h3>
                            <p>We stand by our quality. Most products come with a lifetime mechanical warranty.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🚚</div>
                            <h3>Express Delivery</h3>
                            <p>Get your tools when you need them. Same-day shipping on orders before 2 PM.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🤝</div>
                            <h3>Expert Advice</h3>
                            <p>Our team of professional tradespeople is always available for a consultation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to start your next project?</h2>
                        <p>Join our membership and get 10% off your first order plus exclusive deals.</p>
                        <div className="cta-form">
                            <input type="email" placeholder="Enter your email" className="cta-input" />
                            <button className="btn btn-primary">Join Now</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
