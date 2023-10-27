import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <b>👋😺 Welcome to the Main Chatroom! </b>
        <div>This chatroom provides you with new cat facts.</div>
        <div><i>Friday, October 6th</i></div>
        <div>👤 User Information:</div>
        <MyUserProfile></MyUserProfile>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>
      </header>
    </div>
  );
}

function MyUserProfile(){
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);


  return <div>
    <p>Name: {data.name}</p>
    <p>Color: {data.color}</p>
    <p>Location: {data.location}</p>
    <p>Age: {data.age}</p>
    <p>Gender: {data.gender}</p>
    <p>Grade: {data.grade}</p>
    <p>Status: {data.status}</p>
  </div>
}
function SingleMessage() {
  const names = ['albert', 'brian', 'caren'];
  const thisMessageName = names[Math.floor(Math.random() * 3)];

  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch('https://cat-fact.herokuapp.com/facts/random')
      .then((res) => res.json())
      .then((d) => setData(d.text))
  }

  useEffect(() => {
    fetchInfo();
  }, []);


  return (
    <div className='single-message'>
      <img className="profile-picture" src="https://thenounproject.com/api/private/icons/4003258/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" />
      <div className='message-text'>
        <div className='metadata'>
          <span className='username'>
            <b>{thisMessageName}</b>
          </span>
          <span className='timestamp'>
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div>
          {data}
        </div>
      </div>
    </div>
  );
}

export default App;
