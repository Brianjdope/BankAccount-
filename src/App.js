import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="slack app">
      <header className="slack-header">
        <div className="slack-logo">
          <img
            src="https://helios-i.mashable.com/imagery/articles/047UsVLCrupUmmsuitpn1nw/hero-image.fill.size_1248x702.v1623374965.png"
            alt="Slack-Logo"
          />
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
          <MessagesList messages={messages} />
          <MessageInput setMessages={setMessages} messages={messages} />
        </div>
      </main>
    </div>
  );
}

function UserProfile() {
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
        src="https://t3.ftcdn.net/jpg/00/79/16/32/360_F_79163266_ly2vUi8mopQFcbH26QuYwvTS85XcKLPv.jpg"
        alt="User Profile"
      />
      <div className="user-details">
        <p className="user-name">
          <b>{userData.name}</b>
        </p>
        <p className="user-status">{userData.status}</p>
        <p>Location: {userData.location}</p>
        <p>Age: {userData.age}</p>
        <p>Gender: {userData.gender}</p>
        <p>Grade: {userData.grade}</p>
      </div>
    </div>
  );
}

function ChannelsList() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/channels')
      .then((res) => res.json())
      .then((data) => setChannels(data.channels))
      .catch((error) => console.error("Error fetching channels: ", error));
  }, []);

  return (
    <div className="channels-list">
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>{channel}</li>
        ))}
      </ul>
    </div>
  );
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

function MessagesList({ messages }) {
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

function MessageInput({ setMessages, messages }) {
  const [newMessage, setNewMessage] = useState('');
  const names = ['Albert', 'Caren', 'Brian']; // List of member names

  const handleSubmit = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    setMessages(prevMessages => [
      ...prevMessages,
      {
        text: newMessage,
        username: randomName,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default App;