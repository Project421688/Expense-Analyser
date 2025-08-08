// src/layouts/MainLayout.js
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/TopBar';

export default function MainLayout({ children, pageTitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const topbarRef = useRef(null);

  // Close sidebar on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        topbarRef.current &&
        !topbarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="layout-container">
      <div ref={topbarRef}>
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
          pageTitle={pageTitle}
        />
      </div>

      <div className="layout-body">
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
