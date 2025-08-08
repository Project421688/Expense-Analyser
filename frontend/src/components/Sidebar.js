// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen && (
        <div className="sidebar-content">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/egg">Egg</Link>
            <Link to="/meat">Meat</Link>
            <Link to="/charcoal">Charcoal</Link>
            <Link to="/leaf">Leaf</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/bills">Bills</Link>
            <Link to="/borrows">Borrows</Link>
            <Link to="/grocery">Grocery</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
