import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [interactions, setInteractions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchInteractions();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        getWeather();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = () => {
    axios.get(`http://127.0.0.1:8000/api/get_weather/?city=${city}`)
      .then(response => {
        setWeather(response.data);
        setError('');
        fetchInteractions(); // Atualiza interações após adicionar uma nova
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError('Ocorreu um erro ao buscar os dados meteorológicos.');
        }
        setWeather(null);
      });
  };

  const fetchInteractions = () => {
    axios.get('http://127.0.0.1:8000/api/get_weather_interactions/')
      .then(response => {
        setInteractions(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar interações:', error);
      });
  };

  const clearInteractions = () => {
    axios.delete('http://127.0.0.1:8000/api/clear_weather_interactions/')
      .then(() => {
        setInteractions([]);
        setError('');
      })
      .catch(error => {
        console.error('Erro ao limpar interações:', error);
      });
  };

  return (
    <div>
      <h1>Informações Meteorológicas</h1>
      <div className="flex flex-row justify-center gap-4">
        <input 
          type="text" 
          value={city} 
          onChange={handleInputChange} 
          placeholder="Digite o nome da cidade" 
          className='text-center'
          ref={inputRef}
        />
        <button onClick={getWeather} className="bg-blue-200 p-2">GET NO BIXO</button>
      </div>
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={getWeather}>Tentar Novamente</button>
        </div>
      )}
      {weather && (
        <div className="mt-8">
          <h2>{weather.city}</h2>
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Parâmetro</th>
                <th className="py-2 px-4 border-b">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Temperatura</td>
                <td className="py-2 px-4 border-b">{weather.temperature}°C</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Descrição</td>
                <td className="py-2 px-4 border-b">{weather.description}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Latitude</td>
                <td className="py-2 px-4 border-b">{weather.latitude}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Longitude</td>
                <td className="py-2 px-4 border-b">{weather.longitude}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {interactions.length > 0 && (
        <div className="mt-8">
          <h2>Interações Anteriores</h2>
          <button onClick={clearInteractions} className="bg-red-200 p-2 mb-4">Limpar Interações</button>
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Cidade</th>
                <th className="py-2 px-4 border-b">Temperatura</th>
                <th className="py-2 px-4 border-b">Descrição</th>
                <th className="py-2 px-4 border-b">Latitude</th>
                <th className="py-2 px-4 border-b">Longitude</th>
                <th className="py-2 px-4 border-b">Data e Hora</th>
              </tr>
            </thead>
            <tbody>
              {interactions.map(interaction => (
                <tr key={interaction.id}>
                  <td className="py-2 px-4 border-b">{interaction.city}</td>
                  <td className="py-2 px-4 border-b">{interaction.temperature}°C</td>
                  <td className="py-2 px-4 border-b">{interaction.description}</td>
                  <td className="py-2 px-4 border-b">{interaction.latitude}</td>
                  <td className="py-2 px-4 border-b">{interaction.longitude}</td>
                  <td className="py-2 px-4 border-b">{new Date(interaction.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Weather;
