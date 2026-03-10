import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getAllOrders } from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('inventory'); // 'inventory' or 'orders'
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, orderRes] = await Promise.all([
                getProducts(),
                getAllOrders()
            ]);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stockQuantity: product.stockQuantity
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchData();
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
            } else {
                await createProduct(formData);
            }
            setShowModal(false);
            setEditingProduct(null);
            fetchData();
        } catch (err) {
            alert('Failed to save product');
        }
    };

    if (loading) return <div className="container">Loading Dashboard...</div>;

    return (
        <div className="container dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="dashboard-tabs">
                    <button
                        className={`btn ${view === 'inventory' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setView('inventory')}
                    >
                        Inventory
                    </button>
                    <button
                        className={`btn ${view === 'orders' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setView('orders')}
                    >
                        Orders
                    </button>
                </div>
            </header>

            {view === 'inventory' ? (
                <div className="inventory-section">
                    <div className="section-header">
                        <h2>Product Management</h2>
                        <button className="btn btn-primary" onClick={() => {
                            setEditingProduct(null);
                            setFormData({ name: '', description: '', price: '', category: '', stockQuantity: '' });
                            setShowModal(true);
                        }}>
                            + Add Product
                        </button>
                    </div>

                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category || 'N/A'}</td>
                                        <td>${parseFloat(product.price).toFixed(2)}</td>
                                        <td>
                                            <span className={`stock-badge ${product.stockQuantity < 10 ? 'low-stock' : 'in-stock'}`}>
                                                {product.stockQuantity}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon" onClick={() => handleEdit(product)}>✏️</button>
                                            <button className="btn-icon" onClick={() => handleDelete(product.id)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="orders-section">
                    <h2>Recent Orders</h2>
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.user?.username}</td>
                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td>{order.items?.length} items</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock Quantity</label>
                                <input
                                    type="number"
                                    value={formData.stockQuantity}
                                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
