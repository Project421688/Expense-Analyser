// src/pages/Profile.js
import React from 'react';

const Profile = () => {
  return (
    <div className="page">
      <h1>Profile Page</h1>
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">👤</div>
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Software Developer</p>
            <p>San Francisco, CA</p>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-card">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Main St, San Francisco, CA</p>
          </div>
          
          <div className="detail-card">
            <h3>About Me</h3>
            <p>Passionate software developer with 5+ years of experience in building web applications. Specialized in React, Node.js, and modern JavaScript.</p>
          </div>
          
          <div className="detail-card">
            <h3>Skills</h3>
            <div className="skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML/CSS</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">Git</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;