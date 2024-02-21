import axios from "axios";
import OpenWeatherMap from "openweathermap-ts";

// TODO: hide it
const API_KEY = '';
const GEO_API = 'http://api.openweathermap.org/geo/1.0/'

const openWeather = new OpenWeatherMap({
  apiKey: API_KEY,
  units: 'metric'
});

const searchWeatherData = async (searchInput: string) => {
  if (!searchInput.length) {
    return []
  }

  try {
    const citiesDataResponse = await axios.get(`${GEO_API}direct?q=${searchInput}&limit=5&appid=${API_KEY}`);
    const weatherPromises = citiesDataResponse.data.map((city) => {
      return openWeather.getCurrentWeatherByGeoCoordinates(city.lat, city.lon);
    });

    return await Promise.all(weatherPromises)
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

const fetchWeatherByCityName = async (cityName: string) => {
  try {
    const cityDataResponse = await axios.get(`${GEO_API}direct?q=${cityName}&limit=3&appid=${API_KEY}`);
    const cityData = cityDataResponse.data;
    const weatherPromises = cityData.map((city) => {
      return openWeather.getCurrentWeatherByGeoCoordinates(city.lat, city.lon);
    });

    const weatherResults = await Promise.all(weatherPromises);

    console.log(weatherResults.map(city => city))

  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

export default {
  searchWeatherData,
  fetchWeatherByCityName
};
