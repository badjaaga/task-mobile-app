import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Unit, CurrentResponse } from 'openweathermap-ts/dist/types'

import { ParagraphBold, ParagraphLight } from '../../../shared/Paragraph'
import { calculateCurrentTime } from '../../../utils/calculateCurrentTime'
import { formatTemperature } from '../../../utils/formatTemperature'
import { useAppContext } from '../../../context/AppContext'

interface Props {
  data: Partial<CurrentResponse>
  units: Unit
}

export const CityWeather: React.FC<Props> = ({ data, units }) => {
  const navigation = useNavigation()
  const { searchInput } = useAppContext()

  const handleNavigateToCityForecast = (city: string) => {
    // @ts-ignore
    navigation.navigate('CityWeather', { city, searchInput })
  }
  return (
    <TouchableOpacity
      style={styles.lineItem}
      onPress={() => handleNavigateToCityForecast(data.name)}
    >
      <Image
        style={styles.icon}
        source={{
          uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }}
      />
      <View style={styles.cityData}>
        <ParagraphBold style={[styles.text, styles.cityName]}>
          {data.name}
        </ParagraphBold>
        <ParagraphLight style={[styles.text, styles.time]}>
          {calculateCurrentTime(data.dt)}
        </ParagraphLight>
      </View>
      <ParagraphLight style={styles.temperature}>
        {formatTemperature(data.main.temp, units)}
      </ParagraphLight>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  lineItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#1D2B3D',
    margin: 5,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  cityData: {
    display: 'flex',
  },
  cityName: {
    fontSize: 18,
  },
  time: {
    fontSize: 12,
  },
  temperature: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 'auto',
  },
  icon: {
    width: 50,
    height: 50,
  },
})
