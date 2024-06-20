import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../settings/Theme';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function UserScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    
    name: '',
    email: '',
    avatar: '',
    // Thông tin khác
  });

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = true;
      if (isLoggedIn) {
        const storedUserInfo = {
          name: 'A B C', 
          email: 'abc@gmail.com',
          avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png', 
          //
        };
        setUserInfo(storedUserInfo);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUserInfo({
          name: 'A B C',
          email: 'abc@gmail.com',
          avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png',
        });
      }
    } catch (error) {
      console.error('Lỗi kiểm tra trạng thái đăng nhập: ', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Đăng nhập');
  };

  const handleRegister = () => {
    navigation.navigate('Đăng ký');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />

      {loggedIn ? (
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          <Text style={[styles.userInfoText, { color: theme.colors.text }]}>{userInfo.name}</Text>
          <Text style={[styles.userInfoText, { color: theme.colors.text }]}>{userInfo.email}</Text>
        </View>
      ) : (
        <View style={styles.authContainer}>
          <TouchableOpacity style={[styles.authButton, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
            <Text style={[styles.authButtonText, { color: theme.colors.text }]}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.authButton, { backgroundColor: theme.colors.primary }]} onPress={handleRegister}>
            <Text style={[styles.authButtonText, { color: theme.colors.text }]}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 5,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButton: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  authButtonText: {
    fontSize: 18,
  },
});
