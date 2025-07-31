    // src/components/TopBar.js
import React from 'react';

const TopBar = ({ pageTitle, toggleSidebar, sidebarOpen }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="hamburger-container" onClick={toggleSidebar}>
          <div className={`hamburger-icon ${sidebarOpen ? 'open' : ''}`}>
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </div>
        </div>
        <div className="page-title">
          <h1>{pageTitle}</h1>
        </div>
        
      </div>
    </div>
  );
};

export default TopBar;