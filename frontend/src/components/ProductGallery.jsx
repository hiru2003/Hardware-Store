import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const ProductGallery = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || err.message;
            const status = err.response?.status;
            setError(
                status === 401
                    ? 'Session expired. Please sign in again.'
                    : status
                        ? `Failed to fetch products (${status}). ${typeof msg === 'string' ? msg : 'Check your connection.'}`
                        : 'Failed to fetch products. Please ensure the backend server is running on port 8080.'
            );
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-container">
                    <h3>⚠️ Connection Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="collection-header">
                <div className="container">
                    <span className="subtitle">Industrial Collection</span>
                    <h2>Our <span>Premium</span> Inventory</h2>
                    <p>High-grade tools engineered for professional reliability.</p>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '4rem' }}>
                {products.length === 0 ? (
                    <div className="empty-state">
                        <h3>No products found</h3>
                        <p>We're currently restocking our inventory. Please check back soon.</p>
                    </div>
                ) : (
                    <div className="grid-layout">
                        {products.map((product) => (
                            <div key={product.id} className="pro-card">
                                <div className="img-wrapper">
                                    <span className="tag">{product.category || 'Professional'}</span>
                                    <div className="icon-box">🛠️</div>
                                </div>
                                <div className="pro-details">
                                    <h3 className="pro-name">{product.name}</h3>
                                    <p className="pro-desc">{product.description}</p>
                                    <div className="pro-footer">
                                        <div className="price-tag">${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}</div>
                                        <button
                                            className="buy-btn"
                                            onClick={() => addToCart(product)}
                                            disabled={product.stockQuantity === 0}
                                        >
                                            {product.stockQuantity === 0 ? 'Sold Out' : (
                                                <><span>+</span> Add</>
                                            )}
                                        </button>
                                    </div>
                                    <div className={`stock-status ${product.stockQuantity > 0 ? 'available' : 'unavailable'}`}>
                                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
