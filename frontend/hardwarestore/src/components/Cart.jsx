import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeFromCart, checkout }) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="container cart-page">
                <h2 style={{ marginBottom: '2rem' }}>Shopping Cart</h2>
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your cart is empty</h3>
                    <p style={{ marginBottom: '2rem' }}>Looks like you haven't added any tools yet.</p>
                    <Link to="/" className="btn btn-primary">Browse Validation Tools</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h2 style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem' }}>Your Selection</h2>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="cart-row">
                            <td>
                                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{item.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</div>
                            </td>
                            <td style={{ fontWeight: '500' }}>${item.price.toFixed(2)}</td>
                            <td>
                                <div className="quantity-control">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        color: '#ef4444',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    REMOVE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-summary">
                <div className="summary-row">
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.5rem' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--color-primary)' }}>${total.toFixed(2)}</span>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}
                    onClick={checkout}
                >
                    Checkout Now
                </button>
            </div>
        </div>
    );
};

export default Cart;
