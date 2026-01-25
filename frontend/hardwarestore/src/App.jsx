import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';
import Cart from './components/Cart';

function App() {
    const [cartItems, setCartItems] = useState([]);

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
        alert('Mock Checkout Successful! Thank you for your purchase.');
        setCartItems([]);
    };

    return (
        <Router>
            <div className="App">
                <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
                <Routes>
                    <Route path="/" element={<ProductGallery addToCart={addToCart} />} />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                checkout={checkout}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
