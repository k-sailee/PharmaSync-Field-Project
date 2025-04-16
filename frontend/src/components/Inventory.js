import React, { useEffect, useState } from 'react';
import './Inventory.css';
import AddStockModal from './AddStockModal';
import axios from 'axios';
import { getStatus } from '../utils/stockUtils';

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [restockList, setRestockList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [criticalStock, setCriticalStock] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('All');
  const [sortBy, setSortBy] = useState('');

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/medicine');
      const data = res.data;
      setMedicines(data);
      calculateInsights(data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  const calculateInsights = (data) => {
    setTotalProducts(data.length);
    const low = data.filter(med => med.stock >= 100 && med.stock < 200).length;
    const critical = data.filter(med => med.stock < 100).length;
    setLowStock(low);
    setCriticalStock(critical);

    const restock = data.filter(med => med.stock < 100);
    setRestockList(restock);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || med.category === selectedCategory;
    const matchesStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && med.stock >= 200) ||
      (stockFilter === 'Critical' && med.stock < 100) ||
      (stockFilter === 'Out of Stock' && med.stock < 20);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortBy === 'Stock Asc') return a.stock - b.stock;
    if (sortBy === 'Stock Desc') return b.stock - a.stock;
    return 0;
  });

  const allCategories = [...new Set(medicines.map(med => med.category))];

  return (
    <div className="inventory-main" style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Left Side: Table and Controls */}
      <div style={{ flex: 3 }}>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option>All Categories</option>
            {allCategories.map((cat, idx) => <option key={idx}>{cat}</option>)}
          </select>
          <select onChange={(e) => setStockFilter(e.target.value)} value={stockFilter}>
            <option>All</option>
            <option>In Stock</option>
            <option>Critical</option>
            <option>Out of Stock</option>
          </select>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="">Sort</option>
            <option value="Stock Asc">Stock ↑</option>
            <option value="Stock Desc">Stock ↓</option>
          </select>
        </div>

        <AddStockModal onStockAdded={fetchMedicines} />

        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedMedicines.map((med, idx) => (
                <tr key={idx}>
                  <td>{med.name}</td>
                  <td>{med.category}</td>
                  <td>{med.stock}</td>
                  <td>{new Date(med.expiryDate).toLocaleString('default', { month: 'short', year: 'numeric' })}</td>
                  <td>
                    <span className={`status ${getStatus(med.stock).toLowerCase().replace(' ', '-')}`}>
                      {getStatus(med.stock)}
                    </span>
                  </td>
                  <td>
                    <span className="icon edit">✏️</span>
                    <span className="icon delete">🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side: Insights & Restock */}
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <div className="inventory-side-insights">
          <div className="stock-insights">
            <h3>Stock Insights</h3>
            <p>Total Products: <strong>{totalProducts}</strong></p>
            <p>Low Stock Items: <strong>{lowStock}</strong></p>
            <p>Critical Stock: <strong>{criticalStock}</strong></p>
          </div>

          <div className="restock-cards">
            <h3>Restock Recommendations</h3>
            {restockList.map((item, idx) => (
              <div key={idx} className="restock-card">
                <p><strong>{item.name}</strong></p>
                <p>Current Stock: {item.stock}</p>
                <p>Recommended: 1000</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;