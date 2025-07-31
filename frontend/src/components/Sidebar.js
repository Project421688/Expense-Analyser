// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, activePage, setActivePage, toggleSidebar }) => {
  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'messages', icon: '✉️', label: 'Messages' },
    { id: 'help', icon: '❓', label: 'Help' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Navigation</h2>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
      </div>
      <nav>
        <ul className="menu">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`menu-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.id);
                toggleSidebar();
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© 2023 Sidebar App</p>
      </div>
    </div>
  );
};

export default Sidebar;