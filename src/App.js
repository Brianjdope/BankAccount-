import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  // Define the logo variable or import your logo image
  const logo = 'your-logo-url.png';
  return (
    <div className = "slack app">
      <header className="slack-header">
        <div className="slack-logo">
          <img src={logo} alt="Slack Logo" />
        </div>
        <div className="team-name">
          <b>Your Team Name</b>
        </div>
      </header>
      <main className="slack-main">
        <div className="sidebar">
          <UserProfile />
          <ChannelsList />
        </div>
        <div className="chat-container">
          <ChatHeader />
          <MessagesList />
          <MessageInput />
        </div>
      </main>
    </div>
  );
}
function UserProfile() {
  // User data
  const userData = {
    name: "Caren",
    color: "Red",
    location: "Leonia",
    age: "17",
    gender: "Female",
    grade: "Senior",
    status: "Online",
  };
  return (
    <div className="user-profile">
      <img
        className="profile-picture"
        src="https://your-profile-picture-url.png" // Replace with actual picture URL
        alt="User Profile"
      />
      <div className="user-details">
        <p className="user-name"><b>{userData.name}</b></p>
        <p className="user-status">{userData.status}</p>
      </div>
    </div>
  );
}

function ChannelsList(){
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch('http://localhost:3000/channels')
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);


  return <div>
    <li>{data.general}</li>
    <li>{data.project}</li>
    <li>{data.questions}</li>
    <li>{data.random}</li>
    <li>{data.zoom}</li>
  </div>
}

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="channel-info">
        <b>#general</b>
      </div>
      <div className="members-count">
        Members: 100
      </div>
    </div>
  );
}
function MessagesList() {
  const names = ['albert', 'brian', 'caren'];
  const generateRandomMessage = () => {
    const thisMessageName = names[Math.floor(Math.random() * names.length)];
    return {
      text: "This is a sample message.",
      username: thisMessageName,
      timestamp: new Date().toLocaleTimeString(),
    };
  };
  // Simulate a list of messages
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const newMessages = [];
    for (let i = 0; i < 10; i++) {
      newMessages.push(generateRandomMessage());
    }
    setMessages(newMessages);
  }, []);
  return (
    <div className="messages-list">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          <div className="message-sender">
            <b>{message.username}</b>
            <span className="timestamp">{message.timestamp}</span>
          </div>
          <div className="message-text">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
function MessageInput() {
  return (
    <div className="message-input">
      <input type="text" placeholder="Type your message..." />
      <button>Send</button>
    </div>
  );
}
export default App;