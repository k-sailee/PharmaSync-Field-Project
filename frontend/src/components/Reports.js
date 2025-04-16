// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Report.css';

// const Reports = () => {
//   const [medicineData, setMedicineData] = useState([]);
//   const [lowStock, setLowStock] = useState(0);
//   const [expiredItems, setExpiredItems] = useState(0);
//   const [addedUnits, setAddedUnits] = useState(0);
//   const [dispensedUnits, setDispensedUnits] = useState(0);
//   const [netChange, setNetChange] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/medicine')
//       .then(res => {
//         const data = res.data;
//         setMedicineData(data);
//         calculateSummaries(data);
//       });
//   }, []);

//   const calculateSummaries = (data) => {
//     const today = new Date();
//     let low = 0, expired = 0, added = 0, dispensed = 0;

//     data.forEach(item => {
//       if (item.stock < 50) low++;
//       if (new Date(item.expiryDate) < today) expired++;
//       added += item.added || 0;
//       dispensed += item.dispensed || 0;
//     });

//     setLowStock(low);
//     setExpiredItems(expired);
//     setAddedUnits(added);
//     setDispensedUnits(dispensed);
//     setNetChange(added - dispensed);
//   };

//   return (
//     <div className="p-4 w-full">
//       <h1 className="text-2xl font-bold mb-4">Reports Dashboard</h1>
      
//       <div className="card-container">
//         <div className="card">
//           <h2>Inventory Summary</h2>
//           <p>{medicineData.reduce((acc, cur) => acc + cur.stock, 0)} units</p>
//           <p className="text-red">Low Stock: {lowStock} items</p>
//           <p className="text-red">Expired: {expiredItems} items</p>
//         </div>

//         <div className="card">
//           <h2>Stock Movements</h2>
//           <p>Added: <span className="text-green">+{addedUnits} units</span></p>
//           <p>Dispensed: <span className="text-red">-{dispensedUnits} units</span></p>
//           <p>Net Change: <span className="text-blue">{netChange} units</span></p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="font-semibold text-lg mb-2">📅 Expiry Forecast</h2>
//         <table className="w-full border">
//           <thead className="bg-teal-500 text-white">
//             <tr>
//               <th className="p-2">Medicine</th>
//               <th className="p-2">Expiry Date</th>
//               <th className="p-2">Stock</th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicineData
//               .filter(item => new Date(item.expiryDate) > new Date())
//               .map((item, idx) => (
//                 <tr key={idx} className="text-center">
//                   <td className="p-2">{item.name}</td>
//                   <td className="p-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
//                   <td className="p-2">{item.stock}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css';

const Reports = () => {
  const [summary, setSummary] = useState({});
  const [expiring, setExpiring] = useState([]);

  useEffect(() => {
    // Fetch summary data
    axios.get('http://localhost:5000/api/reports/summary')
      .then(res => {
        setSummary(res.data);
      });

    // Fetch expiring medicines
    axios.get('http://localhost:5000/api/reports/expiring')
      .then(res => {
        setExpiring(res.data);
      });
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Reports Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h2>Inventory Summary</h2>
          <p>{summary.totalStock || 0} units</p>
        </div>

        <div className="card">
          <h2>Stock Movements</h2>
          <p>Added: <span className="text-green">+{summary.added || 0} units</span></p>
          <p>Dispensed: <span className="text-red">-{summary.dispensed || 0} units</span></p>
          <p>Net Change: <span className="text-blue">{summary.netChange || 0} units</span></p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">📅 Expiry Forecast (Next 30 Days)</h2>
        <table className="w-full border">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="p-2">Medicine</th>
              <th className="p-2">Expiry Date</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {expiring.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
                <td className="p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
