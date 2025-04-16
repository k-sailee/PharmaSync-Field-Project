import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBoxes, FaChartLine, FaCog, FaFileAlt, FaHome, FaBars } from "react-icons/fa";
import '../Sidebar.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
      {/* Sidebar */}
      <div className="logo">
        {isSidebarOpen && "PharmaSync"}
      </div>

      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="toggle-btn">
        <FaBars className="text-3xl" />
      </button>

      {/* Menu Items */}
      <nav className="menu">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <FaHome className="text-3xl" /> {isSidebarOpen && "Dashboard"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <FaBoxes className="text-3xl" /> {isSidebarOpen && "Inventory"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <FaChartLine className="text-3xl" /> {isSidebarOpen && "Analytics"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <FaFileAlt className="text-3xl" /> {isSidebarOpen && "Reports"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <FaCog className="text-3xl" /> {isSidebarOpen && "Settings"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
