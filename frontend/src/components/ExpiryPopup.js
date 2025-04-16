import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpiryPopup.css';

const ExpiryPopup = ({ daysBefore = 5 }) => {
  const [alerts, setAlerts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await axios.get(`/api/medicine/expiring-soon/${daysBefore}`);
      if (res.data.length > 0) {
        setAlerts(res.data);
        setShow(true);
      }
    };
    fetchAlerts();
  }, [daysBefore]);

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>⚠️ Medicines Expiring Soon</h3>
        <ul>
          {alerts.map((med) => (
            <li key={med._id}>
              <strong>{med.name}</strong> - {new Date(med.expiryDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <button onClick={() => setShow(false)}>Close</button>
      </div>
    </div>
  );
};

export default ExpiryPopup;
