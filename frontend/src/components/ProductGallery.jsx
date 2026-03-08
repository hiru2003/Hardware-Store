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
            setError('Failed to fetch products. Please ensure the backend server is running on port 8080.');
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
        <div>
            <div className="hero">
                <div className="container">
                    <h1>Premium Hardware <span>Store</span></h1>
                    <p>Professional tools and equipment for every project</p>
                </div>
            </div>

            <div className="container">
                {products.length === 0 ? (
                    <div className="empty-state">
                        <h3>No products available</h3>
                        <p>Check back later for new arrivals.</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="card">
                                <div className="product-image">
                                    <span className="category-badge">{product.category || 'Tool'}</span>
                                    <span style={{ fontSize: '4rem' }}>🛠️</span>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.name}</h3>
                                    <div className="product-price">
                                        ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                                    </div>
                                    <p className="product-description">
                                        {product.description}
                                    </p>
                                    <div className={`product-stock ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.stockQuantity > 0 ? (
                                            <>
                                                <span>✓</span>
                                                <span>{product.stockQuantity} in stock</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>✕</span>
                                                <span>Out of stock</span>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: 'auto' }}
                                        onClick={() => addToCart(product)}
                                        disabled={product.stockQuantity === 0}
                                    >
                                        {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
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
