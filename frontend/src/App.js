// src/App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import Help from './pages/Help';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [pageTitle, setPageTitle] = useState('Home');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const pages = {
    home: <Home />,
    profile: <Profile />,
    settings: <Settings />,
    messages: <Messages />,
    help: <Help />
  };

  // Update page title when active page changes
  useEffect(() => {
    const titles = {
      home: 'Home',
      profile: 'Profile',
      settings: 'Settings',
      messages: 'Messages',
      help: 'Help Center'
    };
    setPageTitle(titles[activePage] || 'App');
  }, [activePage]);

  return (
    <div className="app">
      <TopBar 
        pageTitle={pageTitle} 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen}
      />
      <Sidebar 
        isOpen={sidebarOpen} 
        activePage={activePage} 
        setActivePage={setActivePage}
        toggleSidebar={toggleSidebar}
      />
      <main className={`content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {pages[activePage]}
      </main>
    </div>
  );
}

export default App;