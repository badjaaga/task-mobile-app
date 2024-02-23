import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './view/HomeScreen/HomeScreen'
import { SearchScreen } from './view/SearchCityWeatherScreen/SearchScreen'
import CityWeatherForecastScreen from './view/CityWeatherForecastScreen/CityWeatherForecast'
import { AppContextProvider } from './context/AppContext'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Search'
            component={SearchScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='CityWeather'
            component={CityWeatherForecastScreen}
            options={{
              title: 'Air conditions',
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}
