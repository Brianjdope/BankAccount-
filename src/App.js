import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addNewMessage = async (newMessage) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }

      const data = await response.json();
      setMessages([...messages, data]); // Update state with the new message
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <div className="slack app">
      <header className="slack-header">
        <div className="slack-logo">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <img
            src="https://helios-i.mashable.com/imagery/articles/047UsVLCrupUmmsuitpn1nw/hero-image.fill.size_1248x702.v1623374965.png"
            width={312} height={175}
            alt="Slack-Logo"
          />
          </div>
        </div>
        <div className="team-name">
          <b>LHS Externship '23-24</b>
        </div>
      </header>
      <main className="slack-main">
        <div style = {{float: 'right'}}> 
          <UserProfile/>
        </div>

        <div className="sidebar">
          <div style = {{float: 'left'}}> 
            <ChannelsList/>
            <ChatHeader/>
          </div>
        </div>
        
        <div className="chat-container">
          <ChatHeader />
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <MessagesList messages={messages} />
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <MessageInput setMessages={setMessages} messages={messages} addNewMessage={addNewMessage}/>
          </div>
        </div>

      </main>
    </div>
  );
}

function UserProfile() {
  const userData = {
    name: 'Caren',
    color: 'Red',
    location: 'Leonia',
    age: '17',
    gender: 'Female',
    grade: 'Senior',
    status: 'Online',
  };

  return (  
    <div className="user-profile">
      <div className="profile">
        <b>Profile</b>
      </div>
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
  const [selectedChannel, setSelectedChannel] = useState('');
  const [channelMessages, setChannelMessages] = useState([]);
  const specificChannels = ['#general', '#project', '#q&a', '#random', '#zoom invite links'];

  const handleChannelChange = async (channelName) => {
    setSelectedChannel(channelName);

    try {
      const response = await fetch(`http://localhost:3000/messages/${channelName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setChannelMessages(data);
    } catch (error) {
      console.error(`Error fetching ${channelName} messages:`, error);
    }
  };

  return (
    <div className="channels-list">
      <select className="channel-dropdown" value={selectedChannel} onChange={(e) => handleChannelChange(e.target.value)}>
        <option value="">Select a channel</option>
        {specificChannels.map((channel, index) => (
          <option key={index} value={channel}>
            {channel}
          </option>
        ))}
      </select>
      {selectedChannel && (
        <div className="channel-details">
          <h3>Messages for {selectedChannel}</h3>
          <div className="messages-for-channel">
            {channelMessages.map((message, index) => (
              <div key={index} className="channel-message">
                <b>{message.username}</b>
                <span className="message-timestamp">{message.timestamp}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="channel-info">
        <b>#general</b>
      </div>
      <div className="members-count">Members: 100</div>
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

function MessageInput({ addNewMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const names = ['Albert', 'Caren', 'Brian'];

  const handleSubmit = async () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const timestamp = new Date().toLocaleTimeString();

    const messageToAdd = {
      text: newMessage,
      username: randomName,
      timestamp: timestamp,
    };

    await addNewMessage(messageToAdd);
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
