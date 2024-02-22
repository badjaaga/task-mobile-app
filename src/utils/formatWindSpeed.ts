import { Unit } from 'openweathermap-ts/dist/types'

export const formatWindSpeed = (speed: number, units: Unit = 'metric') => {
  // Read more https://openweathermap.org/current#list:~:text=Wind%20speed.%20Unit%20Default%3A%20meter/sec%2C%20Metric%3A%20meter/sec%2C%20Imperial%3A%20miles/hour  let speedSymbol:string
  let speedSymbol: string

  switch (units) {
    case 'imperial':
      speedSymbol = 'miles/hour'
      break

    case 'metric':
      speedSymbol = 'm/sec'
      break

    case 'standard':
      speedSymbol = 'm/sec'
      break
  }

  return `${Math.ceil(speed)} ${speedSymbol}`
}
