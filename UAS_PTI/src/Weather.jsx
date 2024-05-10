import {useState, useEffect} from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './Loader'
import cloudy from './assets/cloudy.svg'
import cloudy_night from './assets/cloudy+night.svg';
import cloudy_sun from './assets/cloudy+sun.svg';
import moon from './assets/moon.svg'
import rain_cloud from './assets/rain+cloud.svg';
import rain_sun from './assets/rain+sun.svg';
import sun from './assets/sun.svg';
import thunder from './assets/thunder.svg';
import StrongRainy from './assets/StrongRainy.svg';




function fetchWeatherData() {
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);
    const apiKey = 'Vb7CqXlBMysoAqDUniEMCVlS7A0yrKeQ'; // Replace with your Tomorrow.io API key
    const location = "padang";

    // const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?units=metric&location=${location}&apikey=${apiKey}`;
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${apiKey}`;


    useEffect(() =>{
      setLoading(true);
      fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setData(responseJson.timelines.hourly);
        setLoading(false)
      })
      .catch(err => console.error(err));
    }, []);
   return {loading, data};
}

function getWeatherCondition(weatherCode) {
  const d = new Date();
  let hour = d.getHours();
  var time;
  if(hour > 18 || (hour >= 0 && hour <= 6)) time = "night";
  else time = "day";
  switch(time){
    case("night"):
    switch (weatherCode) {
      case 1000:
        return {"source":moon,"condition":'Clear'};
      case 1100:
        return {"source":moon,"condition":'Mostly Clear'};
      case 1101:
        return {"source":cloudy_night,"condition":'Partly Cloudy'};
      case 1102:
        return {"source":cloudy,"condition":'Mostly Cloudy'};
      case 1001:
        return {"source":cloudy,"condition":'Cloudy'};
      case 2000:
      case 2100:
        return {"source":cloudy,"condition":'Fog'};
      case 3000:
        return 'Light Wind';
      case 3001:
        return 'Wind';
      case 3002:
        return 'Strong Wind';
      case 4000:
        return 'Drizzle';
      case 4001:
        return {"source":rain_cloud,"condition":'Rain'};
      case 4200:
        return {"source":rain_cloud,"condition":'Light Rain'};
      case 4201:
        return {"source":StrongRainy,"condition":'Heavy Rain'};
      case 8000:
        return {"source":thunder,"condition":'Thunderstorm'};
      default:
        return 'Unknown';
    }

    case("day"):
    switch (weatherCode) {
      case 1000:
        return {"source":sun,"condition":'Clear'};
      case 1100:
        return {"source":sun,"condition":'Mostly Clear'};
      case 1101:
        return {"source":cloudy_sun,"condition":'Partly Cloudy'};
      case 1102:
        return {"source":cloudy,"condition":'Mostly Cloudy'};
      case 1001:
        return {"source":cloudy,"condition":'Cloudy'};
      case 2000:
      case 2100:
        return {"source":cloudy,"condition":'Fog'};
      case 3000:
        return 'Light Wind';
      case 3001:
        return 'Wind';
      case 3002:
        return 'Strong Wind';
      case 4000:
        return 'Drizzle';
      case 4001:
        return {"source":rain_cloud,"condition":'Rain'};
      case 4200:
        return {"source":rain_sun,"condition":'Light Rain'};
      case 4201:
        return {"source":StrongRainy,"condition":'Heavy Rain'};
      case 8000:
        return {"source":thunder,"condition":'Thunderstorm'};
      default:
        return 'Unknown';
    }
  }
 
}


function Weather() {
  const {loading, data} = fetchWeatherData();

  if (loading) {
    return <Loader></Loader>;
  }

  

  const forecast_value = [[getWeatherCondition(data[32].values.weatherCode),data[32]], [getWeatherCondition(data[33].values.weatherCode),data[33]], [getWeatherCondition(data[34].values.weatherCode),data[34]], [getWeatherCondition(data[35].values.weatherCode),data[35]], [getWeatherCondition(data[36].values.weatherCode),data[36]]];
  console.log(forecast_value[0][0])
  const weather = getWeatherCondition(data[31].values.weatherCode);




  // console.log(weather['source']);


  // // // Call the fetchWeatherData function when the page loads

  // // // Function to get weather condition based on weather code
  
  return (
    <>
      <div class="weather-container">
        <div class="weather-icon"><img src={weather['source']} alt="" /></div>
        <div class="temperature">{data[31].values.temperature}</div>
        <div class="weather-status">{weather['condition']}</div>
    </div>

    <div class="weather-forecast">
      {forecast_value.map((forecast_data) => (
          <div class="weather-container">
          <div class="weather-icon"><img src={forecast_data[0]['source']} alt="" /></div>
          <div class="temperature">{forecast_data[1].values.temperature}</div>
          <div class="weather-status">{forecast_data[0]['condition']}</div>
        </div>
      ))}

      </div>
    </>
  )
}

export default Weather



