import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { placeOrder } from './services/api';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';
import Cart from './components/Cart';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [auth, setAuth] = useState(() => ({
        token: window.localStorage.getItem('authToken'),
        username: window.localStorage.getItem('authUsername'),
        role: window.localStorage.getItem('authRole'),
    }));

    const addToCart = (product) => {
        if (!auth.token) {
            navigate('/auth');
            return;
        }
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

    const checkout = async () => {
        try {
            const orderData = cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));
            await placeOrder(orderData); // Assuming placeOrder is defined elsewhere or will be imported
            alert('Checkout Successful! Your order has been placed.');
            setCartItems([]);
        } catch (err) {
            alert('Failed to place order: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleAuthSuccess = (token, username, role) => {
        window.localStorage.setItem('authToken', token);
        window.localStorage.setItem('authUsername', username);
        window.localStorage.setItem('authRole', role);
        setAuth({ token, username, role });
    };

    const handleLogout = () => {
        window.localStorage.removeItem('authToken');
        window.localStorage.removeItem('authUsername');
        window.localStorage.removeItem('authRole');
        setAuth({ token: null, username: null, role: null });
    };

    return (
        <div className="App">
            <Navbar
                cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                isAuthenticated={!!auth.token}
                username={auth.username}
                role={auth.role}
                onLogout={handleLogout}
            />
            <main style={{ minHeight: '80vh' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            auth.token
                                ? <Home />
                                : <Navigate to="/auth" replace />
                        }
                    />
                    <Route
                        path="/products"
                        element={<ProductGallery addToCart={addToCart} />}
                    />
                    <Route
                        path="/auth"
                        element={
                            auth.token
                                ? <Navigate to="/products" replace />
                                : <AuthPage onAuthSuccess={handleAuthSuccess} />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            auth.token ? (
                                auth.role === 'ADMIN' ? (
                                    <Navigate to="/admin" replace />
                                ) : (
                                    <Cart
                                        cartItems={cartItems}
                                        updateQuantity={updateQuantity}
                                        removeFromCart={removeFromCart}
                                        checkout={checkout}
                                    />
                                )
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            auth.token && auth.role === 'ADMIN' ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
