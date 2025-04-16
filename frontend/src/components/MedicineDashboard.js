import React, { useState } from 'react';

const MedicineDashboard = () => {
  const [medicineId, setMedicineId] = useState('');

  const reorderMedicine = async (medicineId) => {
    try {
      const response = await fetch(`/api/reorder/${medicineId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Reorder placed successfully:', data);
      } else {
        console.error('Error placing reorder:', data);
      }
    } catch (error) {
      console.error('Network error during reorder:', error);
    }
  };

  const handleReorderClick = () => {
    if (medicineId) {
      reorderMedicine(medicineId);
    } else {
      console.error('Please provide a valid medicine ID.');
    }
  };

  return (
    <div>
      <h1>Medicine Dashboard</h1>
      <input
        type="text"
        value={medicineId}
        onChange={(e) => setMedicineId(e.target.value)}
        placeholder="Enter Medicine ID"
      />
      <button onClick={handleReorderClick}>Reorder Medicine</button>
    </div>
  );
};

export default MedicineDashboard;
