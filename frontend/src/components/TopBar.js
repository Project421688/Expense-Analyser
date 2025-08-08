// src/components/Topbar.js
import React from 'react';

export default function Topbar({ onMenuClick, isSidebarOpen, pageTitle }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger-btn" onClick={onMenuClick}>☰</button>
        {isSidebarOpen && <span className="logo-text">Expanse Analyser</span>}
      </div>
      <div className="topbar-title">{pageTitle}</div>
    </div>
  );
}
