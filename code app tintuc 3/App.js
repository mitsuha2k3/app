import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/home';
import SearchScreen from './screens/Search';
import UserScreen from './screens/User';
import SettingsScreen from './screens/Settings';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/Register';
import { ThemeProvider, useTheme } from './settings/Theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tìm kiếm') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Người dùng') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Cài đặt') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Trang chủ" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Tìm kiếm" 
        component={SearchScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Người dùng" 
        component={UserScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Cài đặt" 
        component={SettingsScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Đăng nhập" component={LoginScreen} />
        <Stack.Screen name="Đăng ký" component={RegisterScreen} />
      </Stack.Navigator>
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
