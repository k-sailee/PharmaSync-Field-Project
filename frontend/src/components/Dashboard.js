import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getStatus } from '../utils/stockUtils';
import ExpiryAlert from './ExpiryAlert';

import AddStockModal from './AddStockModal';

// const Dashboard = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [filteredMeds, setFilteredMeds] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [openActionIndex, setOpenActionIndex] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/medicine')
//       .then(res => res.json())
//       .then(data => {
//         setMedicines(data);
//         setFilteredMeds(data);
//       })
//       .catch(err => console.error('Error fetching medicines:', err));
//   }, []);

//   const totalStock = medicines.reduce((acc, med) => acc + med.stock, 0);
//   const lowStockItems = medicines.filter(med => med.stock < 200);
//   const expiringSoon = medicines.filter(med => {
//     const today = new Date();
//     const expiry = new Date(med.expiryDate);
//     const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
//     return diffDays <= 30 && diffDays >= 0;
//   });
//   const totalValue = (totalStock * 50).toLocaleString(); // Approx value

//   // const getStatus = (stock) => {
//   //   if (stock < 100) return 'Critical';
//   //   if (stock < 200) return 'Low Stock';
//   //   return 'In Stock';
//   // };

//   useEffect(() => {
//     let filtered = [...medicines];
//     if (categoryFilter) {
//       filtered = filtered.filter(med => med.category === categoryFilter);
//     }
//     if (statusFilter) {
//       filtered = filtered.filter(med => getStatus(med.stock) === statusFilter);
//     }
//     setFilteredMeds(filtered);
//   }, [categoryFilter, statusFilter, medicines]);

//   const exportToCSV = () => {
//     const headers = ['Product Name,Category,Stock,Expiry Date,Status'];
//     const rows = filteredMeds.map(med =>
//       `${med.name},${med.category},${med.stock},${new Date(med.expiryDate).toLocaleDateString()},${getStatus(med.stock)}`
//     );
//     const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'inventory_export.csv';
//     a.click();
//   };

//   const refreshInventory = () => {
//     fetch('http://localhost:5000/api/medicine')
//       .then(res => res.json())
//       .then(data => {
//         setMedicines(data);
//       })
//       .catch(err => console.error('Error refreshing inventory:', err));
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <div>
//           <h2>Welcome back, Dr. Smith</h2>
//           <p>Here's what's happening in your pharmacy today</p>
//         </div>
//         <button className="add-stock-btn" onClick={() => setShowModal(true)}>+ Add New Stock</button>
//       </header>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <h3>Total Inventory</h3>
//           <p>{totalStock.toLocaleString()}</p>
//           <span className="positive">↑ 3.2% from last month</span>
//         </div>
//         <div className="stat-card">
//           <h3>Low Stock Items</h3>
//           <p>{lowStockItems.length}</p>
//           <span className="negative">↑ {lowStockItems.length} new alerts</span>
//         </div>
//         <div className="stat-card">
//           <h3>Expiring Soon</h3>
//           <p>{expiringSoon.length}</p>
//           <span>Within 30 days</span>
//         </div>
//         <div className="stat-card">
//           <h3>Total Value</h3>
//           <p>${totalValue}k</p>
//           <span className="positive">↑ 8.3% from last month</span>
//         </div>
//       </div>
// <ExpiryAlert/>
//       <div className="inventory-section">
//         <div className="inventory-header">
//           <h3>Inventory Management</h3>
//           <div className="filters">
//             <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
//               <option value="">All Categories</option>
//               {[...new Set(medicines.map(med => med.category))].map((cat, idx) => (
//                 <option key={idx} value={cat}>{cat}</option>
//               ))}
//             </select>
//             <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
//               <option value="">All Statuses</option>
//               <option value="In Stock">In Stock</option>
//               <option value="Low Stock">Low Stock</option>
//               <option value="Critical">Critical</option>
//             </select>
//             <button onClick={exportToCSV}>Export</button>
//           </div>
//         </div>

//         <table className="inventory-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Stock</th>
//               <th>Expiry Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMeds.map((med, idx) => (
//               <tr key={idx}>
//                 <td>{med.name}</td>
//                 <td>{med.category}</td>
//                 <td>{med.stock} units</td>
//                 <td>{new Date(med.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
//                 <td>
//                   <span className={`status-badge ${getStatus(med.stock).replace(' ', '-').toLowerCase()}`}>
//                     {getStatus(med.stock)}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="action-container">
//                     <span className="action-dots" onClick={() => setOpenActionIndex(openActionIndex === idx ? null : idx)}>⋮</span>
//                     {openActionIndex === idx && (
//                       <div className="action-menu">
//                         <button onClick={() => alert('Edit functionality here')}>Edit</button>
//                         <button onClick={() => alert('Delete functionality here')}>Delete</button>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddStockModal
//   isVisible={showModal}
//   onClose={() => setShowModal(false)}
//   onStockAdded={refreshInventory}
// />

//     </div>
//   );
// };

// export default Dashboard;import React, { useEffect, useState } from 'react';


import './Dashboard.css';
// import MedicineTable from './MedicineTable';
const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openActionIndex, setOpenActionIndex] = useState(null);
 

  useEffect(() => {
    // Fetch medicines from the backend
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/medicine');
        const data = await response.json();
        setMedicines(data);  // Store medicines in state
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/medicine')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        setFilteredMeds(data);
      })
      .catch(err => console.error('Error fetching medicines:', err));
  }, []);

  const totalStock = medicines.reduce((acc, med) => acc + med.stock, 0);
  const lowStockItems = medicines.filter(med => med.stock < 200);
  const expiringSoon = medicines.filter(med => {
    const today = new Date();
    const expiry = new Date(med.expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 30 && diffDays >= 0;
  });
  const reorderMeds = medicines.filter(med => med.stock < 10); // Medicines that need to be reordered
  const totalValue = (totalStock * 50).toLocaleString(); // Approx value

  useEffect(() => {
    let filtered = [...medicines];
    if (categoryFilter) {
      filtered = filtered.filter(med => med.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(med => getStatus(med.stock) === statusFilter);
    }
    setFilteredMeds(filtered);
  }, [categoryFilter, statusFilter, medicines]);

  const exportToCSV = () => {
    const headers = ['Product Name,Category,Stock,Expiry Date,Status'];
    const rows = filteredMeds.map(med =>
      `${med.name},${med.category},${med.stock},${new Date(med.expiryDate).toLocaleDateString()},${getStatus(med.stock)}`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_export.csv';
    a.click();
  };
  const triggerManualReorder = async (medicineId) => {
    console.log('Trigger function called for medicineId:', medicineId); // Log the medicine ID
  
    try {
      const response = await fetch(`http://localhost:5000/api/reorder/${medicineId}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        alert('Reorder placed successfully');
        // After reorder, refresh the inventory to show updated stock
        refreshInventory();  // Fetch the latest data from the server
      } else {
        const errorData = await response.json();
        console.error('Error placing reorder:', errorData);  // Log the error data from the backend
        alert('Error placing reorder');
      }
    } catch (error) {
      console.error('Error placing reorder:', error);
      alert('Network error during reorder');
    }
  };
  
  const refreshInventory = () => {
    fetch('http://localhost:5000/api/medicine')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
      })
      .catch(err => console.error('Error refreshing inventory:', err));
  };
  const deleteMedicine = async (medicineId) => {
    try {
      const response = await fetch(`/api/medicine/${medicineId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Medicine deleted successfully');
        // After deletion, update the medicines list and low stock list
        setMedicines(medicines.filter(med => med._id !== medicineId));
      } else {
        alert('Error deleting medicine: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('Error deleting medicine');
    }
  };
  
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2>Welcome back, Dr. Smith</h2>
          <p>Here's what's happening in your pharmacy today</p>
        </div>
        <button className="add-stock-btn" onClick={() => setShowModal(true)}>+ Add New Stock</button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Inventory</h3>
          <p>{totalStock.toLocaleString()}</p>
          <span className="positive">↑ 3.2% from last month</span>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p>{lowStockItems.length}</p>
          <span className="negative">↑ {lowStockItems.length} new alerts</span>
        </div>
        <div className="stat-card">
          <h3>Expiring Soon</h3>
          <p>{expiringSoon.length}</p>
          <span>Within 30 days</span>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p>${totalValue}k</p>
          <span className="positive">↑ 8.3% from last month</span>
        </div>
      </div>

      {/* Pass both expiringSoon and reorderMeds to ExpiryAlert */}
      <ExpiryAlert expiringMeds={expiringSoon} reorderMeds={reorderMeds} />

      {/* Add the Low Stock Medicines section here */}
      <div className="low-stock-section">
        <h3>Low Stock Medicines</h3>
        <ul>
          {reorderMeds.map((med, idx) => (
            <li key={idx}>
              {med.name} - {med.stock} units remaining. 
              <button onClick={() => triggerManualReorder(med._id)}>Reorder</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="inventory-section">
        <div className="inventory-header">
          <h3>Inventory Management</h3>
          <div className="filters">
            <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
              <option value="">All Categories</option>
              {[...new Set(medicines.map(med => med.category))].map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
              <option value="">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Critical">Critical</option>
            </select>
            <button onClick={exportToCSV}>Export</button>
          </div>
        </div>
        {/* <MedicineTable medicines={medicines} /> */}
        <table className="inventory-table">
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
            {filteredMeds.map((med, idx) => (
              <tr key={idx}>
                <td>{med.name}</td>
                <td>{med.category}</td>
                <td>{med.stock} units</td>
                <td>{new Date(med.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                <td>
                  <span className={`status-badge ${getStatus(med.stock).replace(' ', '-').toLowerCase()}`}>
                    {getStatus(med.stock)}
                  </span>
                </td>
                <td>
                  <div className="action-container">
                    <span className="action-dots" onClick={() => setOpenActionIndex(openActionIndex === idx ? null : idx)}>⋮</span>
                    {openActionIndex === idx && (
                      <div className="action-menu">
                        <button onClick={() => alert('Edit functionality here')}>Edit</button>
                        <button onClick={() => alert('Delete functionality here')}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStockModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onStockAdded={refreshInventory}
      />
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import MedicineTable from './MedicineTable';
// import AddStockModal from './AddStockModal'; // Make sure you have this component for adding new stock
// import ExpiryAlert from './ExpiryAlert'; // Assuming you have this component to show expiry alerts

// const Dashboard = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [filteredMeds, setFilteredMeds] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [openActionIndex, setOpenActionIndex] = useState(null);

//   // Fetch medicines from the backend
//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const response = await fetch('/api/medicine');
//         const data = await response.json();
//         setMedicines(data);  // Store medicines in state
//         setFilteredMeds(data);
//       } catch (error) {
//         console.error('Error fetching medicines:', error);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   const totalStock = medicines.reduce((acc, med) => acc + med.stock, 0);
//   const lowStockItems = medicines.filter(med => med.stock < 200);
//   const expiringSoon = medicines.filter(med => {
//     const today = new Date();
//     const expiry = new Date(med.expiryDate);
//     const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
//     return diffDays <= 30 && diffDays >= 0;
//   });
//   const reorderMeds = medicines.filter(med => med.stock < 10); // Medicines that need to be reordered
//   const totalValue = (totalStock * 50).toLocaleString(); // Approx value

//   // Filter medicines based on category and status
//   useEffect(() => {
//     let filtered = [...medicines];
//     if (categoryFilter) {
//       filtered = filtered.filter(med => med.category === categoryFilter);
//     }
//     if (statusFilter) {
//       filtered = filtered.filter(med => getStatus(med.stock) === statusFilter);
//     }
//     setFilteredMeds(filtered);
//   }, [categoryFilter, statusFilter, medicines]);

//   const exportToCSV = () => {
//     const headers = ['Product Name,Category,Stock,Expiry Date,Status'];
//     const rows = filteredMeds.map(med =>
//       `${med.name},${med.category},${med.stock},${new Date(med.expiryDate).toLocaleDateString()},${getStatus(med.stock)}`
//     );
//     const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'inventory_export.csv';
//     a.click();
//   };

//   // Handle reorder logic
//   const triggerManualReorder = async (medicineId) => {
//     const response = await fetch(`/api/reorder/${medicineId}`, {
//       method: 'POST'
//     });

//     if (response.ok) {
//       alert('Reorder placed successfully');
//     } else {
//       alert('Error placing reorder');
//     }
//   };

//   // Handle delete logic
//   const deleteMedicine = async (medicineId) => {
//     const response = await fetch(`/api/medicine/${medicineId}`, {
//       method: 'DELETE'
//     });

//     if (response.ok) {
//       const updatedMedicines = medicines.filter(med => med._id !== medicineId);
//       setMedicines(updatedMedicines);
//       setFilteredMeds(updatedMedicines);
//       alert('Medicine deleted successfully');
//     } else {
//       alert('Error deleting medicine');
//     }
//   };

//   // Refresh inventory after stock update or deletion
//   const refreshInventory = () => {
//     fetch('/api/medicine')
//       .then(res => res.json())
//       .then(data => {
//         setMedicines(data);
//         setFilteredMeds(data);
//       })
//       .catch(err => console.error('Error refreshing inventory:', err));
//   };

//   // Status function to categorize stock levels
//   const getStatus = (stock) => {
//     if (stock < 10) return 'Critical';
//     if (stock < 50) return 'Low Stock';
//     return 'In Stock';
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <div>
//           <h2>Welcome back, Dr. Smith</h2>
//           <p>Here's what's happening in your pharmacy today</p>
//         </div>
//         <button className="add-stock-btn" onClick={() => setShowModal(true)}>+ Add New Stock</button>
//       </header>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <h3>Total Inventory</h3>
//           <p>{totalStock.toLocaleString()}</p>
//           <span className="positive">↑ 3.2% from last month</span>
//         </div>
//         <div className="stat-card">
//           <h3>Low Stock Items</h3>
//           <p>{lowStockItems.length}</p>
//           <span className="negative">↑ {lowStockItems.length} new alerts</span>
//         </div>
//         <div className="stat-card">
//           <h3>Expiring Soon</h3>
//           <p>{expiringSoon.length}</p>
//           <span>Within 30 days</span>
//         </div>
//         <div className="stat-card">
//           <h3>Total Value</h3>
//           <p>${totalValue}k</p>
//           <span className="positive">↑ 8.3% from last month</span>
//         </div>
//       </div>

//       {/* Pass both expiringSoon and reorderMeds to ExpiryAlert */}
//       <ExpiryAlert expiringMeds={expiringSoon} reorderMeds={reorderMeds} />

//       {/* Add the Low Stock Medicines section here */}
//       <div className="low-stock-section">
//         <h3>Low Stock Medicines</h3>
//         <ul>
//           {reorderMeds.map((med, idx) => (
//             <li key={idx}>
//               {med.name} - {med.stock} units remaining.
//               <button onClick={() => triggerManualReorder(med._id)}>Reorder</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="inventory-section">
//         <div className="inventory-header">
//           <h3>Inventory Management</h3>
//           <div className="filters">
//             <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
//               <option value="">All Categories</option>
//               {[...new Set(medicines.map(med => med.category))].map((cat, idx) => (
//                 <option key={idx} value={cat}>{cat}</option>
//               ))}
//             </select>
//             <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
//               <option value="">All Statuses</option>
//               <option value="In Stock">In Stock</option>
//               <option value="Low Stock">Low Stock</option>
//               <option value="Critical">Critical</option>
//             </select>
//             <button onClick={exportToCSV}>Export</button>
//           </div>
//         </div>
//         <MedicineTable medicines={filteredMeds} deleteMedicine={deleteMedicine} reorderMedicine={triggerManualReorder} />
//       </div>

//       <AddStockModal
//         isVisible={showModal}
//         onClose={() => setShowModal(false)}
//         onStockAdded={refreshInventory}
//       />
//     </div>
//   );
// };

// export default Dashboard;

