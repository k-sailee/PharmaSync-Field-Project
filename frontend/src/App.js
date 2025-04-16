import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Inventory from "./Components/Inventory";
import Analytics from "./Components/Analytics/Analytics";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings/Settings";
import Login from "./Components/LoginRegister/LoginRegister";

import "./App.css";
import ScanPage from "../src/Pages/ScanPage";

function Layout() {
    const location = useLocation();
    
    // Check if the current page is the login page
    const isLoginPage = location.pathname === "/";

    return (
        <div className={isLoginPage ? "login-container" : "app-container"}>
            {/* Only render Sidebar if we're not on the login page */}
            {!isLoginPage && <Sidebar />}
            <div className={isLoginPage ? "login-content" : "main-content"}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  
                    <Route path="/scan" element={<ScanPage />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
