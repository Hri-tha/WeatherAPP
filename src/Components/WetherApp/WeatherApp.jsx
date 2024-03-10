import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search from '../Assets/search.png';
import clou from '../Assets/cloud.png';
import clear from '../Assets/clear.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import wind from '../Assets/wind.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = [ 'Darbhanga', 'Delhi', 'Mumbai', 'Patna'];
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23752e79bd7ac96ca091f4a97ba7459e&units=metric`
            ).then(response => response.json())
          )
        );
        console.log(responses); // Log the responses to understand their structure
        setWeatherData(responses);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (data) => {
    if (data && data.weather && data.weather.length > 0) {
      switch (data.weather[0].main) {
        case 'Clear':
          return clear;
        case 'Clouds':
          return clou;
        case 'Rain':
          return rain;
        default:
          return clou; // Default icon
      }
    } else {
      return clou; // Default icon if weather data is not available
    }
  };

  return (
    <div className="container">
      {weatherData.map((data, index) => (
        <div className="weather" key={index}>
          {/* Render weather data here dynamically */}
          <img src={getWeatherIcon(data)} alt="" className="hkt" />
          <div className="element">
            <p>{data.name}, {data.sys && data.sys.country}</p>
            {data.weather && data.weather.length > 0 && (
              <>
                <p>{data.weather[0].description}</p>
                <p>Temp: {data.main.temp}&deg;C</p>
              </>
            )}
            {data.main && (
              <>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed} m/s</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherApp;

