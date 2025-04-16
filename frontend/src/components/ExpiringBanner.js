import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 👈 This is where you import axios
import './ExpiringBanner.css'; // your CSS file for blinking

const ExpiringBanner = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/medicine/expiring-soon/5'); // 👈 Your API call
        setAlerts(res.data);
      } catch (error) {
        console.error('Error fetching expiring medicines:', error);
      }
    };

    fetchAlerts();
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="blinking-banner">
      {alerts.map((med) => (
        <span key={med._id} className="blink">
          ⚠️ <strong>{med.name}</strong> is expiring on{" "}
          {new Date(med.expiryDate).toLocaleDateString()} &nbsp;&nbsp;
        </span>
      ))}
    </div>
  );
};

export default ExpiringBanner;
