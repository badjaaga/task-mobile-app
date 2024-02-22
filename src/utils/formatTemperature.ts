import { Unit } from 'openweathermap-ts/dist/types'

export const formatTemperature = (
  temperature: number,
  units: Unit = 'metric',
) => {
  // Read more https://openweathermap.org/current#list:~:text=Temperature.%20Unit%20Default%3A%20Kelvin%2C%20Metric%3A%20Celsius%2C%20Imperial%3A%20Fahrenheit
  let temperatureSymbol: string

  switch (units) {
    case 'imperial':
      temperatureSymbol = '°K'
      break

    case 'metric':
      temperatureSymbol = '°C'
      break

    case 'standard':
      temperatureSymbol = '°F'
      break
  }

  if (temperature < 0) {
    return `${Math.floor(temperature)} ${temperatureSymbol}`
  } else {
    return `+${Math.ceil(temperature)} ${temperatureSymbol}`
  }
}
