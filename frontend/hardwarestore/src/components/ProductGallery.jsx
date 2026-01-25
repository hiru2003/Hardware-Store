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
            setError('Failed to fetch products. Is the backend running?');
            setLoading(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading premium tools...</div>;
    if (error) return <div className="container" style={{ padding: '4rem 2rem', color: '#ef4444', textAlign: 'center' }}>Error: {error}</div>;

    return (
        <div>
            <div className="hero">
                <div className="container">
                    <h1>Built for <span style={{ color: 'var(--color-primary)' }}>Makers</span></h1>
                    <p>Premium hardware tools for professionals and enthusiasts.</p>
                </div>
            </div>

            <div className="container">
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            <div className="product-image">
                                <span className="category-badge">{product.category || 'Tool'}</span>
                                <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>🛠️</span>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <div className="product-price">${product.price ? product.price.toFixed(2) : '0.00'}</div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {product.description}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                    onClick={() => addToCart(product)}
                                    disabled={product.stockQuantity === 0}
                                >
                                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
