import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  Switch,
  Dimensions,
  Platform,
} from 'react-native'
import { useDebounce } from 'usehooks-ts'
import weatherService from '../../services/weatherService'
import { uniqueById } from '../../utils/uniqueByID'
import { ParagraphLight } from '../../shared/Paragraph'
import { useAppContext } from '../../context/AppContext'
import { CityWeather } from './components/CityWeather'

export const SearchScreen: React.FC = () => {
  const { searchInput, setSearchInput, toggleUnits, units } = useAppContext()
  const debouncedValue = useDebounce<string>(searchInput, 500)
  const [isLoading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await weatherService.searchWeatherData(
          debouncedValue,
          units,
        )
        setWeatherData(uniqueById(data))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather data: ', error)
      }
    }

    fetchData()
  }, [debouncedValue, units])

  const handleSwitchUnits = (value: boolean) => {
    toggleUnits(!!value ? 'metric' : 'standard')
  }

  const renderLoader = useCallback(
    () => <ActivityIndicator size='large' color='#FFFFFF' />,
    [],
  )

  const renderNoSearchQuery = useCallback(
    () => (
      <ParagraphLight style={styles.notFound}>
        Begin typing to find what you're looking for
      </ParagraphLight>
    ),
    [],
  )

  const renderNoResultsFound = useCallback(
    () => (
      <ParagraphLight style={styles.notFound}>
        Oops! We couldn't find any results. Please try a different search.
      </ParagraphLight>
    ),
    [],
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputBox}>
        <TextInput
          style={styles.input}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder='Enter city name'
          placeholderTextColor='#9BA0A5'
        />
        <Button title='Cancel' onPress={() => setSearchInput('')} />
      </View>

      {weatherData && weatherData.length > 0 && (
        <View style={styles.toggleContainer}>
          <ParagraphLight style={styles.toggleLabel}>Fahrenheit</ParagraphLight>
          <Switch
            value={units === 'metric'} // Assuming 'metric' represents Celsius and 'standard' represents Fahrenheit
            onValueChange={handleSwitchUnits}
          />
          <ParagraphLight style={styles.toggleLabel}>Celsius</ParagraphLight>
        </View>
      )}

      {isLoading ? (
        renderLoader()
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {weatherData && weatherData.length > 0
            ? weatherData.map((data) => (
                <CityWeather key={data.id} data={data} units={units} />
              ))
            : searchInput.length
              ? renderNoResultsFound()
              : renderNoSearchQuery()}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const hasNotch = () => {
  const { height, width } = Dimensions.get('window')
  if (Platform.OS === 'android') {
    const { height, width } = Dimensions.get('window')
    return height >= 800 || width >= 800
  }
  if (Platform.OS === 'ios' && !Platform.isPad) {
    return height >= 812 || width >= 812
  }
  return false
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07131F',
    display: 'flex',
    flex: 1,
    paddingTop: hasNotch() ? 24 : 0,
  },
  searchInputBox: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07131F',
  },
  input: {
    flex: 1,
    height: 48,
    margin: 12,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#1D2B3D',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notFound: {
    color: '#bcbcbc',
    marginTop: 30,
    fontSize: 18,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 30,
  },
  toggleLabel: {
    color: '#fff',
    marginHorizontal: 5,
  },
})
