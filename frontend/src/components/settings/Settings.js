import React from "react";
import "./Settings.css";

const Settings = () => {
    return (
        <div className="settings-container">
            <div className="settings-header">
                <h2>Settings</h2>
                <button className="save-btn">Save Changes</button>
            </div>

            {/* User Profile Settings */}
            <div className="user-profile">
                <div className="profile-details">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value="Dr. Jhonson" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value="orange@pharmasync.com" />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select>
                            <option>Administrator</option>
                        </select>
                    </div>
                </div>
              
            </div>

            {/* Pharmacy Preferences */}
            <div className="section">
                <h3>Pharmacy Preferences</h3>
                <div className="form-group">
                    <label>Store Name</label>
                    <input type="text" />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" />
                </div>
                <div className="form-group">
                    <label>Working Hours</label>
                    <input type="text" />
                </div>
            </div>

            {/* Inventory Settings */}
            <div className="section">
                <h3>Inventory Settings</h3>
                <div className="toggle-switch">
                    <span>Low Stock Alerts</span>
                    <input type="number"  />
                </div>
                <div className="toggle-switch">
                    <span>Auto-Restock Recommendations</span>
                    <input type="checkbox"  />
                </div>
            </div>

            {/* Notifications & Alerts */}
            <div className="section">
                <h3>Notifications & Alerts</h3>
                <div className="toggle-switch">
                    <span>Email Notifications</span>
                    <input type="checkbox"  />
                </div>
                <div className="toggle-switch">
                    <span>SMS Alerts</span>
                    <input type="checkbox" />
                </div>
            </div>

            {/* Security Settings */}
            <div className="section security-options">
                <h3>Security Settings</h3>
                <a href="#">Change Password</a>
                <a href="#">Two-Factor Authentication</a>
            </div>
        </div>
    );
};

export default Settings;
