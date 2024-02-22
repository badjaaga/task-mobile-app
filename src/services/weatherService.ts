import axios from 'axios'
import OpenWeatherMap from 'openweathermap-ts'
import { Unit } from 'openweathermap-ts/dist/types'

const API_KEY = process.env.REACT_APP_OPENWEATHER_MAPS_API_KEY
const GEO_API = 'http://api.openweathermap.org/geo/1.0/'

const openWeather = new OpenWeatherMap({
  apiKey: API_KEY,
})

const searchWeatherData = async (
  searchInput: string,
  units: Unit = 'metric',
) => {
  if (!searchInput.length) {
    return []
  }

  try {
    const citiesDataResponse = await axios.get(
      `${GEO_API}direct?q=${searchInput}&limit=5&appid=${API_KEY}`,
    )
    openWeather.setUnits(units)
    const weatherPromises = citiesDataResponse.data.map((city) => {
      return openWeather.getCurrentWeatherByGeoCoordinates(city.lat, city.lon)
    })

    return await Promise.all(weatherPromises)
  } catch (error) {
    console.error('An error occurred:', error)
    throw error
  }
}

const fetchWeatherByCityName = async (
  cityName: string,
  units: Unit = 'metric',
) => {
  try {
    openWeather.setUnits(units)
    return openWeather.getCurrentWeatherByCityName({ cityName })
  } catch (error) {
    console.error('An error occurred:', error)
    throw error
  }
}

export default {
  searchWeatherData,
  fetchWeatherByCityName,
}
