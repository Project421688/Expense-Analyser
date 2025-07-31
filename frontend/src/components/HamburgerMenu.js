// src/components/HamburgerMenu.js
import React from 'react';

const HamburgerMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? 'visible' : 'hidden'}`} onClick={toggleSidebar}>
      <div className="hamburger-icon">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;