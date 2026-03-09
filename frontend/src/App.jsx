import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';
import Cart from './components/Cart';
import AuthPage from './components/AuthPage';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [auth, setAuth] = useState(() => ({
        token: window.localStorage.getItem('authToken'),
        username: window.localStorage.getItem('authUsername'),
    }));

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const checkout = () => {
        const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        const message = `Checkout Successful!\n\nTotal: $${total.toFixed(2)}\nItems: ${cartItems.length}\n\nThank you for your purchase!`;
        
        if (window.confirm(message)) {
            setCartItems([]);
        }
    };

    const handleAuthSuccess = (token, username) => {
        setAuth({ token, username });
    };

    const handleLogout = () => {
        window.localStorage.removeItem('authToken');
        window.localStorage.removeItem('authUsername');
        setAuth({ token: null, username: null });
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    isAuthenticated={!!auth.token}
                    username={auth.username}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            auth.token
                                ? <ProductGallery addToCart={addToCart} />
                                : <Navigate to="/auth" replace />
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            auth.token
                                ? <Navigate to="/" replace />
                                : <AuthPage onAuthSuccess={handleAuthSuccess} />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            auth.token ? (
                                <Cart
                                    cartItems={cartItems}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                    checkout={checkout}
                                />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
