import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
