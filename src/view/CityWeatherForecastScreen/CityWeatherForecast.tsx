import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import weatherService from '../../services/weatherService'
import { formatTemperature } from '../../utils/formatTemperature'
import { ParagraphBold, ParagraphLight } from '../../shared/Paragraph'
import { useAppContext } from '../../context/AppContext'
import { formatWindSpeed } from '../../utils/formatWindSpeed'

const CityWeatherForecastScreen = ({ route }) => {
  const { units } = useAppContext()
  const { city } = route.params
  const [isLoading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)

  const weatherDataMapper = useMemo(() => {
    return [
      { title: 'Pressure', text: `${weatherData?.main?.pressure} hPa` },
      { title: 'Humidity', text: `${weatherData?.main?.humidity} %` },
      { title: 'Wind', text: formatWindSpeed(weatherData?.wind?.speed) },
      {
        title: 'Visibility',
        text: `${Math.ceil(weatherData?.visibility / 1000).toFixed(1)} km`,
      },
    ]
  }, [weatherData])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ParagraphLight style={[styles.text, styles.flatTitle]}>
        {item.title}
      </ParagraphLight>
      <ParagraphBold style={[styles.text, styles.flatValue]}>
        {item.text}
      </ParagraphBold>
    </View>
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await weatherService.fetchWeatherByCityName(city, units)
        setWeatherData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather data: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#FFFFFF' />
      ) : (
        <>
          <View style={styles.main}>
            <ParagraphBold style={[styles.text, styles.cityName]}>
              {city}
            </ParagraphBold>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`,
              }}
            />

            <Text style={[styles.text, styles.temperature]}>
              {formatTemperature(weatherData?.main?.temp, units)}
            </Text>
            <Text style={styles.text}>
              Feels like{' '}
              {formatTemperature(weatherData?.main?.feels_like, units)}
            </Text>
            <ParagraphLight style={[styles.text, styles.description]}>
              {weatherData?.weather[0]?.description}
            </ParagraphLight>
          </View>

          <FlatList
            data={weatherDataMapper}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            numColumns={2}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07131F',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#ffffff',
  },
  cityName: {
    fontSize: 36,
    textAlign: 'center',
  },
  description: {
    marginTop: 18,
    fontSize: 18,
  },
  temperature: {
    fontSize: 36,
    marginBottom: 12,
  },
  icon: {
    width: 150,
    height: 150,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#1D2B3D',
  },
  flatTitle: {
    fontSize: 18,
  },
  flatValue: {
    fontSize: 24,
  },
})

export default CityWeatherForecastScreen
