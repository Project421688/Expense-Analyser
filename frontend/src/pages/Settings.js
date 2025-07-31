// src/pages/Settings.js
import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  
  return (
    <div className="page">
      <h1>Settings Page</h1>
      
      <div className="settings-container">
        <div className="setting-section">
          <h2>Account Settings</h2>
          <div className="setting-item">
            <label>Username</label>
            <input type="text" defaultValue="john_doe" />
          </div>
          <div className="setting-item">
            <label>Email</label>
            <input type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="setting-item">
            <label>Password</label>
            <input type="password" defaultValue="••••••••" />
          </div>
        </div>
        
        <div className="setting-section">
          <h2>Preferences</h2>
          <div className="setting-item">
            <label>Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              Enable Notifications
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={emailUpdates}
                onChange={() => setEmailUpdates(!emailUpdates)}
              />
              Email Updates
            </label>
          </div>
        </div>
        
        <div className="setting-section">
          <h2>Privacy</h2>
          <div className="setting-item">
            <label>Profile Visibility</label>
            <select defaultValue="public">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Data Sharing</label>
            <select defaultValue="limited">
              <option value="none">No Sharing</option>
              <option value="limited">Limited Sharing</option>
              <option value="full">Full Sharing</option>
            </select>
          </div>
        </div>
        
        <div className="actions">
          <button className="btn-save">Save Changes</button>
          <button className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;