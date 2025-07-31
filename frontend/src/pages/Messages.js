// src/pages/Messages.js
import React, { useState } from 'react';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  
  const messages = {
    inbox: [
      { id: 1, sender: 'Alice Johnson', subject: 'Meeting Tomorrow', preview: 'Hi, just confirming our meeting tomorrow at 10 AM...', time: '2 hours ago', unread: true },
      { id: 2, sender: 'Project Team', subject: 'Project Update', preview: 'The latest project update is now available...', time: '5 hours ago', unread: false },
      { id: 3, sender: 'Bob Smith', subject: 'Lunch?', preview: 'Are you free for lunch this Friday?', time: '1 day ago', unread: false }
    ],
    sent: [
      { id: 4, sender: 'Me', subject: 'Re: Project Timeline', preview: 'Thanks for the update. I reviewed the timeline...', time: '3 hours ago' },
      { id: 5, sender: 'Me', subject: 'Meeting Notes', preview: 'Here are the notes from our meeting...', time: '1 day ago' }
    ],
    drafts: [
      { id: 6, sender: 'Me', subject: 'Quarterly Report', preview: 'Attached is the draft of the quarterly report...', time: '3 days ago' }
    ]
  };
  
  return (
    <div className="page">
      <h1>Messages Page</h1>
      
      <div className="messages-container">
        <div className="messages-header">
          <div className="tabs">
            <button 
              className={activeTab === 'inbox' ? 'active' : ''}
              onClick={() => setActiveTab('inbox')}
            >
              Inbox <span className="badge">3</span>
            </button>
            <button 
              className={activeTab === 'sent' ? 'active' : ''}
              onClick={() => setActiveTab('sent')}
            >
              Sent
            </button>
            <button 
              className={activeTab === 'drafts' ? 'active' : ''}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts
            </button>
          </div>
          <button className="btn-compose">+ Compose</button>
        </div>
        
        <div className="messages-list">
          {messages[activeTab].map(message => (
            <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
              <div className="message-checkbox">
                <input type="checkbox" />
              </div>
              <div className="message-sender">{message.sender}</div>
              <div className="message-content">
                <div className="message-subject">{message.subject}</div>
                <div className="message-preview">{message.preview}</div>
              </div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;