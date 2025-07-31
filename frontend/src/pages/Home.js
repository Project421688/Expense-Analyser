// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="page">
      <h1 className='h1'>Home Page</h1>
      <div className="dashboard">
        <div className="card">
          <h3>Welcome!</h3>
          <p>This is your personalized dashboard. You can navigate to other pages using the sidebar.</p>
        </div>
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">128</div>
            <div className="stat-label">Messages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24</div>
            <div className="stat-label">Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Notifications</div>
          </div>
        </div>
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>📝 Created new project</li>
            <li>✅ Completed task: Update profile</li>
            <li>👥 Added new team member</li>
            <li>📊 Generated monthly report</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;