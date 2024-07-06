import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mymodels/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="bg-blue">
        <p className='text-2xl bg-blue-200'>
          Django com ReactJS
        </p>
      </header>
      <h1>My Models</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Weather />
    </div>
  );
}

export default App;
