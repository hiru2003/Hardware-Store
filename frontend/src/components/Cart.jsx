import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeFromCart, checkout }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const total = subtotal;

    if (cartItems.length === 0) {
        return (
            <div className="container cart-page">
                <h2>Shopping Cart</h2>
                <div className="empty-state">
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.5 }}>🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to find professional tools for your next project.</p>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '1rem 2rem' }}>
                        Browse Pro-Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h2>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="cart-row">
                            <td>
                                <div className="cart-product-info">
                                    <div className="cart-product-name">{item.name}</div>
                                    <div className="cart-product-category">{item.category}</div>
                                </div>
                            </td>
                            <td>
                                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                                    ${parseFloat(item.price).toFixed(2)}
                                </span>
                            </td>
                            <td>
                                <div className="quantity-control">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>
                                <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '1.125rem' }}>
                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', fontSize: '1.125rem' }}
                    onClick={checkout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
