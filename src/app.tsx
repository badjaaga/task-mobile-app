import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Home/HomeScreen";
import { SearchScreen } from "./SearchScreen/SearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

