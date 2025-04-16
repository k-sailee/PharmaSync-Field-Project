// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ExpiryAlert.css';

// const ExpiryAlert = () => {
//   const [expiringMedicines, setExpiringMedicines] = useState([]);

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/medicine/expiring-soon/5');
//         setExpiringMedicines(response.data);
//       } catch (error) {
//         console.error('Error fetching expiring medicines:', error);
//       }
//     };

//     fetchAlerts();
//   }, []);

//   if (expiringMedicines.length === 0) return null;

//   return (
//     <div className="alert-box blink">
//       <h3>⚠️ Expiry Alert!</h3>
//       <ul>
//         {expiringMedicines.map((med) => (
//           <li key={med._id}>
//             <strong>{med.name}</strong> is expiring on{' '}
//             {new Date(med.expiryDate).toLocaleDateString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExpiryAlert;
import React from 'react';

const ExpiryAlert = ({ expiringMeds, reorderMeds }) => {
  return (
    <div className="expiry-alert-container">
      <h3> ⚠️ Expiry Alerts</h3>
      <div>
        <h4>Medicines Expiring Soon:</h4>
        <ul>
          {expiringMeds.length > 0 ? (
            expiringMeds.map((med, idx) => (
              <li key={idx}>
                <strong>{med.name}</strong> - Expiry Date: {new Date(med.expiryDate).toLocaleDateString()}
              </li>
            ))
          ) : (
            <p>No medicines expiring soon.</p>
          )}
        </ul>
      </div>

      <div>
        <h4>Medicines That Need Reordering (Stock Below 10):</h4>
        <ul>
          {reorderMeds.length > 0 ? (
            reorderMeds.map((med, idx) => (
              <li key={idx}>
                <strong>{med.name}</strong> - Remaining Stock: {med.stock} units
              </li>
            ))
          ) : (
            <p>No medicines need reordering.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpiryAlert;
