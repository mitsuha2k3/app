import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './screens/home'
import SearchScreen from './screens/Search'
import UserScreen from './screens/User'
import SettingsScreen from './screens/Settings'
import { ThemeProvider, useTheme } from './settings/Theme'

const Tab = createBottomTabNavigator()

function App() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline'
            } else if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="User" 
          component={UserScreen} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
