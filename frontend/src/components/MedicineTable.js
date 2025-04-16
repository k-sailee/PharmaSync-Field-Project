import React, { useState } from 'react';

const MedicineTable = ({ medicines, deleteMedicine }) => {
  const [openActionIndex, setOpenActionIndex] = useState(null); // useState hook should be inside the component

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
        alert('Reorder placed successfully!');
      } else {
        console.error('Error placing reorder:', data);
        alert('Error placing reorder');
      }
    } catch (error) {
      console.error('Network error during reorder:', error);
      alert('Network error during reorder');
    }
  };

  return (
    <div>
      <h1>Medicines List</h1>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, idx) => ( // Add idx as second parameter to map
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.stock}</td>
              <td>
                <div className="action-container">
                  <span className="action-dots" onClick={() => setOpenActionIndex(openActionIndex === idx ? null : idx)}>⋮</span>
                  {openActionIndex === idx && (
                    <div className="action-menu">
                      <button onClick={() => alert('Edit functionality here')}>Edit</button>
                      <button onClick={() => deleteMedicine(medicine._id)}>Delete</button>  {/* Call delete function */}
                      <button onClick={() => reorderMedicine(medicine._id)}>Reorder</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
