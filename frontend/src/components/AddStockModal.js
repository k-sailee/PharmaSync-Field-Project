// components/AddStockModal.js
import React, { useState, useEffect } from "react";
import "./AddStockModal.css";

const AddStockModal = ({ isVisible, onClose, onStockAdded }) => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    category: "",
    stock: "",
    expiryDate: "",
    barcode: "",
  });

  useEffect(() => {
    if (!isVisible) {
      setMedicineData({
        name: "",
        category: "",
        stock: "",
        expiryDate: "",
        barcode: "",
      });
    }
  }, [isVisible]);

  const handleInputChange = (e) => {
    setMedicineData({ ...medicineData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!medicineData.name || !medicineData.category || !medicineData.expiryDate || !medicineData.barcode || !medicineData.stock) {
      return alert("🚫 Please fill all fields before submitting!");
    }

    try {
      const preparedData = {
        ...medicineData,
        stock: parseInt(medicineData.stock),
      };

      const res = await fetch("http://localhost:5000/api/medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });

      if (res.ok) {
        alert("✅ Stock added successfully!");
        onStockAdded();
        onClose();
      } else {
        const errorData = await res.json();
        console.error("❌ Backend error:", errorData);
        alert("❌ Failed to add stock");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("❌ Network error occurred");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Medicine</h2>
        <input type="text" name="name" placeholder="Name" value={medicineData.name} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={medicineData.category} onChange={handleInputChange} />
        <input type="number" name="stock" placeholder="Stock" value={medicineData.stock} onChange={handleInputChange} />
        <input type="date" name="expiryDate" value={medicineData.expiryDate} onChange={handleInputChange} />
        <input type="text" name="barcode" placeholder="Barcode" value={medicineData.barcode} onChange={handleInputChange} />

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
